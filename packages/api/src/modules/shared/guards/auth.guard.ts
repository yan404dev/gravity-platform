import {
  AlsService,
  CURRENT_PROFILE_ID_CONSTANT,
  USER_ID_CONSTANT,
} from '@/als';
import { environment } from '@/jsonwebtoken';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JsonWebTokenError, JwtService } from '@nestjs/jwt';
import {
  IGNORE_ALL_GUARDS_KEY,
  IGNORE_AUTH_GUARD_KEY,
  IS_PUBLIC_PRIVATE_KEY,
} from 'src/common/decorators';
import { TokenPayloadEntity } from 'src/domain/entities';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly alsService: AlsService,
  ) {}

  async canActivate(context: ExecutionContext) {
    this.logger.debug('🔐 Checking authentication');

    const ignoreAllGuards = this.reflector.getAllAndOverride<boolean>(
      IGNORE_ALL_GUARDS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (ignoreAllGuards) {
      this.logger.debug('⏭️ All guards ignored (IgnoreAllGuards)');
      return true;
    }

    const ignoreAuthGuard = this.reflector.getAllAndOverride<boolean>(
      IGNORE_AUTH_GUARD_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (ignoreAuthGuard) {
      this.logger.debug('⏭️ AuthGuard ignored');
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request.headers);

    const isPublicPrivate = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_PRIVATE_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!isPublicPrivate && !token) {
      this.logger.warn('⚠️ Token not found');

      throw new HttpException('Not authenticated', HttpStatus.UNAUTHORIZED);
    }

    try {
      if (!token) {
        this.logger.warn('⚠️ Token not found');
        throw new HttpException('Token not found', HttpStatus.UNAUTHORIZED);
      }

      const payload = await this.jwtService.verifyAsync<TokenPayloadEntity>(
        token,
        {
          secret: environment.JWT.SECRET,
        },
      );

      this.alsService.merge({
        [USER_ID_CONSTANT]: payload.sub,
        [CURRENT_PROFILE_ID_CONSTANT]: payload.currentProfileId,
      });

      this.logger.debug(
        `✔️ Token validated - Payload: ${JSON.stringify(payload)}`,
      );
      return true;
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        this.logger.error('❌ Invalid or expired JWT', error.message);
        throw new HttpException(
          'Invalid or expired token',
          HttpStatus.UNAUTHORIZED,
        );
      }

      this.logger.error('❌ Error validating JWT', error);
      throw new HttpException(
        'Error validating token',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  private extractTokenFromHeader(headers: any): string | undefined {
    if (!headers?.authorization) return undefined;

    const [type, authorization] = headers.authorization?.split(' ');

    return type === 'Bearer' ? authorization : undefined;
  }
}
