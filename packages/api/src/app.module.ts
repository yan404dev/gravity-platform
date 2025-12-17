import { Module } from '@nestjs/common';
import { AlsModule } from '@/als';
import { PrismaModule } from '@/prisma';

@Module({
  imports: [PrismaModule.forRoot(), AlsModule.forRoot()],
})
export class AppModule {}
