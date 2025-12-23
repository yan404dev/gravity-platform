import { Module } from '@nestjs/common';
import { AlsModule } from '@/als';
import { PrismaModule } from '@/prisma';
import { SharedModule } from './modules/shared/shared.module';
import { UsersModule } from './modules/users/users.module';
import { QueryBuilderModule } from '@/query-builder';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    PrismaModule.forRoot(),
    AlsModule.forRoot(),
    QueryBuilderModule.forRoot(),
    SharedModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
