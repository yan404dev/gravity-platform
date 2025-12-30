import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { EventsRepository } from '../repositories/events.repository';
import { CreateEventDto, QueryEventDto, UpdateEventDto } from 'src/domain/dtos';
import { EventEntity, ResultEntity } from 'src/domain/entities';
import { Prisma } from '@prisma/client';
import { QueryBuilderService } from '@/query-builder';
import { AlsService, CURRENT_PROFILE_ID_CONSTANT } from '@/als';

@Injectable()
export class EventsService {
  private readonly logger = new Logger(EventsService.name);

  constructor(
    private readonly eventsRepository: EventsRepository,
    private readonly queryBuilderService: QueryBuilderService,
    private readonly alsService: AlsService,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<EventEntity> {
    this.logger.log(
      `⚙️ [${this.create.name}]: Creating event: ${createEventDto.title}`,
    );

    if (createEventDto.startDate >= createEventDto.endDate) {
      this.logger.warn(
        `⚠️ Invalid date range for event: ${createEventDto.title}`,
      );
      throw new HttpException(
        'Start date must be before end date',
        HttpStatus.BAD_REQUEST,
      );
    }

    const currentProfileId = this.alsService.getOrThrowError<number>(
      CURRENT_PROFILE_ID_CONSTANT,
    );
    const event = await this.eventsRepository.create(
      createEventDto,
      currentProfileId,
    );

    this.logger.log(
      `✅ Event created successfully: ${event.title} (ID: ${event.id})`,
    );
    return event;
  }

  async search(queryDto: QueryEventDto): Promise<ResultEntity<EventEntity>> {
    this.logger.debug(`🔍 [${this.search.name}]: Searching events`);

    const { query } = this.queryBuilderService
      .date('createdAt', queryDto.dataInicio, queryDto.dataFim)
      .condition<Prisma.EventWhereInput>({
        deletedAt: null,
        ...(queryDto.status && {
          status: queryDto.status,
        }),
        ...(queryDto.privacy && {
          privacy: queryDto.privacy,
        }),
        ...(queryDto.category && {
          category: { contains: queryDto.category, mode: 'insensitive' },
        }),
        ...(queryDto.city && {
          city: { contains: queryDto.city, mode: 'insensitive' },
        }),
        ...(queryDto.startDateFrom && {
          startDate: { gte: queryDto.startDateFrom },
        }),
        ...(queryDto.startDateTo && {
          startDate: { lte: queryDto.startDateTo },
        }),
        ...(queryDto.endDateFrom && {
          endDate: { gte: queryDto.endDateFrom },
        }),
        ...(queryDto.endDateTo && {
          endDate: { lte: queryDto.endDateTo },
        }),
      })
      .pagination(queryDto.page, queryDto.perPage)
      .sort(queryDto.orderBy);

    const [data, total] = await this.eventsRepository.search(query);

    this.logger.debug(`Found ${data.length} events out of ${total} total`);

    const info = {
      page: queryDto.page,
      pages: Math.ceil(total / queryDto.perPage),
      perPage: queryDto.perPage,
      total,
    };

    return { data, info };
  }

  async findById(id: number): Promise<EventEntity> {
    this.logger.debug(`🔍 [${this.findById.name}]: Finding event: ${id}`);

    const event = await this.eventsRepository.getById(id);

    if (!event) {
      this.logger.warn(`⚠️ Event not found: ${id}`);
      throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
    }

    return event;
  }

  async update(id: number, updateDto: UpdateEventDto): Promise<EventEntity> {
    this.logger.log(`⚙️ [${this.update.name}]: Updating event: ${id}`);

    const event = await this.findById(id);

    const currentProfileId = this.alsService.getOrThrowError<number>(
      CURRENT_PROFILE_ID_CONSTANT,
    );
    const update = await this.eventsRepository.update(
      id,
      updateDto,
      currentProfileId,
    );

    if (!update) {
      this.logger.warn(`⚠️ Event not found: ${id}`);
      throw new HttpException('Failed to update', HttpStatus.NOT_ACCEPTABLE);
    }

    this.logger.log(
      `✅ Event updated successfully: ${event.title} (ID: ${event.id})`,
    );
    return update;
  }

  async remove(id: number): Promise<EventEntity> {
    this.logger.log(`⚙️ [${this.remove.name}]: Soft deleting event: ${id}`);

    const event = await this.findById(id);

    const currentProfileId = this.alsService.getOrThrowError<number>(
      CURRENT_PROFILE_ID_CONSTANT,
    );
    const update = await this.eventsRepository.softDelete(id, currentProfileId);

    if (!update) {
      this.logger.warn(`⚠️ Event not found: ${id}`);
      throw new HttpException('Failed to delete', HttpStatus.NOT_ACCEPTABLE);
    }

    this.logger.log(
      `✅ Event soft deleted successfully: ${event.title} (ID: ${event.id})`,
    );
    return update;
  }
}
