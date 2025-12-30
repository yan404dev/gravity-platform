import { Module } from '@nestjs/common';
import { EventsService } from './services/events.service';
import { EventsController } from './controllers/events.controller';
import { EventsRepository } from './repositories/events.repository';

@Module({
  controllers: [EventsController],
  providers: [EventsService, EventsRepository],
  exports: [EventsService, EventsRepository],
})
export class EventsModule {}
