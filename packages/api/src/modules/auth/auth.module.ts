import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { BcryptModule } from '@/bcrypt';
import { JsonwebtokenModule } from '@/jsonwebtoken';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule, BcryptModule, JsonwebtokenModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
