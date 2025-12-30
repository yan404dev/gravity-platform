import {
  DynamicModule,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { MetadataMiddleware, TracingMiddleware } from './middlewares';
import { AuthGuard } from './guards';

@Module({})
export class SharedModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TracingMiddleware).forRoutes('*');
    consumer.apply(MetadataMiddleware).forRoutes('*');
  }

  static forRoot(): DynamicModule {
    return {
      module: SharedModule,
      providers: [AuthGuard],
      global: true,
    };
  }
}
