import { Module } from '@nestjs/common';
import { AlsModule } from '@/als';
import { PrismaModule } from '@/prisma';
import { SharedModule } from './modules/shared/shared.module';

@Module({
  imports: [PrismaModule.forRoot(), AlsModule.forRoot(), SharedModule],
})
export class AppModule {}
