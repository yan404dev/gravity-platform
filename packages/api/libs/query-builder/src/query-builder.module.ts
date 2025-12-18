import { DynamicModule, Module } from '@nestjs/common';
import { QueryBuilderService } from './services';

@Module({})
export class QueryBuilderModule {
  static forRoot(): DynamicModule {
    return {
      module: QueryBuilderModule,
      providers: [QueryBuilderService],
      exports: [QueryBuilderService],
      global: true,
    };
  }
}
