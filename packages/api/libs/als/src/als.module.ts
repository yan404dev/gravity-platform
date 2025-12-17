import { DynamicModule, Module } from '@nestjs/common';
import { AlsService } from './services/als.service';

@Module({})
export class AlsModule {
  static forRoot(): DynamicModule {
    return {
      module: AlsModule,
      providers: [AlsService],
      exports: [AlsService],
      global: true,
    };
  }
}
