import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { EventsService } from '../services/events.service';
import { CreateEventDto, QueryEventDto, UpdateEventDto } from 'src/domain/dtos';
import { EventEntity, ResultEntity } from 'src/domain/entities';
import { AuthGuard } from 'src/modules/shared/guards';

@Controller('events')
@UseGuards(AuthGuard)
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto): Promise<EventEntity> {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  search(
    @Query() queryParams: QueryEventDto,
  ): Promise<ResultEntity<EventEntity>> {
    return this.eventsService.search(queryParams);
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: string): Promise<EventEntity> {
    return this.eventsService.findById(+id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateEventDto: UpdateEventDto,
  ): Promise<EventEntity> {
    return this.eventsService.update(+id, updateEventDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: string): Promise<void> {
    await this.eventsService.remove(+id);
  }
}
