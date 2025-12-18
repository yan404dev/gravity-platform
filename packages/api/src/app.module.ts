import { Module } from '@nestjs/common';
import { AlsModule } from '@/als';
import { PrismaModule } from '@/prisma';
import { SharedModule } from './modules/shared/shared.module';
import { UsersModule } from './modules/users/users.module';
import { QueryBuilderModule } from '@/query-builder';

@Module({
  imports: [
    PrismaModule.forRoot(),
    AlsModule.forRoot(),
    QueryBuilderModule.forRoot(),
    SharedModule,
    UsersModule,
  ],
})
export class AppModule {}
