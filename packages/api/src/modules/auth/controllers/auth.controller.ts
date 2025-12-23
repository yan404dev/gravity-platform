import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from 'src/domain/dtos';
import { LoginResponseEntity } from 'src/domain/entities';
import { ACCESS_TOKEN_CONSTANT, AlsService } from '@/als';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly alsService: AlsService,
  ) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginDto: LoginDto): Promise<LoginResponseEntity> {
    return this.authService.login(loginDto);
  }

  @Post('/refresh-token')
  @HttpCode(HttpStatus.OK)
  refreshToken(): Promise<LoginResponseEntity> {
    const token = this.alsService.getOrThrowError<string>(
      ACCESS_TOKEN_CONSTANT,
    );

    return this.authService.refreshToken(token);
  }
}
