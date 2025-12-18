import { Module } from '@nestjs/common';
import { BcryptService } from './services';

@Module({
  providers: [BcryptService],
  exports: [BcryptService],
})
export class BcryptModule {}
