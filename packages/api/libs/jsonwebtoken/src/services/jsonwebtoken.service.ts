import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { environment } from '../config';

@Injectable()
export class JsonwebtokenService {
  constructor(private readonly jwtService: JwtService) {}

  generateAccessToken(payload: any): string {
    return this.jwtService.sign(payload, {
      expiresIn: Math.floor(environment.JWT.ACCESS_TTL / 1000),
    });
  }

  generateRefreshToken(payload: any): string {
    return this.jwtService.sign(payload, {
      expiresIn: Math.floor(environment.JWT.REFRESH_TTL / 1000),
    });
  }

  verify<T extends object = object>(token: string): T {
    return this.jwtService.verify<T>(token);
  }
}
