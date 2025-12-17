import { DynamicModule, Module } from '@nestjs/common';
import { PrismaService } from './services';

@Module({})
export class PrismaModule {
  static forRoot(): DynamicModule {
    return {
      module: PrismaModule,
      providers: [PrismaService],
      exports: [PrismaService],
      global: true,
    };
  }
}
