import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma';
import { EventEntity } from 'src/domain/entities';
import { $Enums, Prisma } from '@prisma/client';
import { QueryBuilderEntity } from '@/query-builder';
import { CreateEventDto, UpdateEventDto } from 'src/domain/dtos';

@Injectable()
export class EventsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(data: CreateEventDto, profileId: number): Promise<EventEntity> {
    return this.prismaService.event.create({
      data: {
        ...data,
        tags: data.tags || [],
        status: data.status || $Enums.EventStatus.DRAFT,
        price: new Prisma.Decimal(data.price),
        createdBy: {
          connect: {
            id: profileId,
          },
        },
        deletedAt: null,
      },
    });
  }

  search(query: QueryBuilderEntity): Promise<[EventEntity[], number]> {
    return Promise.all([
      this.prismaService.event.findMany({
        ...query,
      }),
      this.prismaService.event.count({
        where: query?.where,
      }),
    ]);
  }

  getById(id: number): Promise<EventEntity | null> {
    return this.prismaService.event.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  update(
    id: number,
    data: UpdateEventDto,
    profileId: number,
  ): Promise<EventEntity> {
    return this.prismaService.event.update({
      where: {
        id,
      },
      data: {
        ...data,
        updatedById: profileId,
      },
    });
  }

  softDelete(id: number, deletedById: number): Promise<EventEntity> {
    return this.prismaService.event.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
        deletedById,
      },
    });
  }

  count(where?: Prisma.EventWhereInput): Promise<number> {
    return this.prismaService.event.count({
      where: {
        ...where,
        deletedAt: null,
      },
    });
  }
}
