import { BcryptService } from '@/bcrypt';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { LoginDto } from 'src/domain/dtos';
import {
  LoginResponseEntity,
  TokenPayloadEntity,
  UserWithoutPasswordEntity,
} from 'src/domain/entities';
import { JsonwebtokenService } from '@/jsonwebtoken';
import { UsersService } from 'src/modules/users/services/users.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UsersService,
    private readonly bcryptService: BcryptService,
    private readonly jsonwebtokenService: JsonwebtokenService,
  ) {}

  async login(loginDto: LoginDto): Promise<LoginResponseEntity> {
    this.logger.log(
      `🔐 [${this.login.name}]: Iniciando login: ${JSON.stringify(loginDto.email)}`,
    );
    const user = await this.userService.findByEmail(loginDto.email);

    this.logger.debug(
      `🔍 [${this.login.name}]: Usuario encontrado: ${JSON.stringify(user)}`,
    );

    const isPasswordValid = await this.bcryptService.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      this.logger.warn(
        `⚠️ [${this.login.name}]: Senha inválida: ${JSON.stringify(loginDto.email)}`,
      );

      throw new HttpException('Senha inválida', HttpStatus.UNAUTHORIZED);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, currentProfile, ...userWithoutPassword } = user;

    if (!currentProfile) {
      this.logger.warn(
        `⚠️ [${this.login.name}]: Usuario sem perfil atual: ${JSON.stringify(loginDto.email)}`,
      );

      throw new HttpException(
        'Usuario sem perfil atual',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const response = this.generateTokens(
      userWithoutPassword,
      currentProfile.id,
      currentProfile,
    );

    this.logger.log(
      `✅ [${this.login.name}]: Login realizado com sucesso: ${JSON.stringify(loginDto.email)}`,
    );

    return response;
  }

  async refreshToken(token: string): Promise<LoginResponseEntity> {
    this.logger.log(`🔐 [${this.refreshToken.name}]: Iniciando refresh token`);
    try {
      const decodedToken =
        this.jsonwebtokenService.verify<TokenPayloadEntity>(token);

      if (decodedToken.type !== 'refresh') {
        this.logger.warn(
          `⚠️ [${this.refreshToken.name}]: Tipo de token inválido`,
        );

        throw new HttpException('Token inválido', HttpStatus.UNAUTHORIZED);
      }

      const user = await this.userService.findByIdWithCurrentProfile(
        decodedToken.sub,
      );

      this.logger.debug(
        `🔍 [${this.refreshToken.name}]: Usuario encontrado: ${JSON.stringify(user)}`,
      );

      const { currentProfile, ...userWithoutProfile } = user;

      if (!currentProfile) {
        this.logger.warn(
          `⚠️ [${this.refreshToken.name}]: Usuario sem perfil atual`,
        );

        throw new HttpException(
          'Usuario sem perfil atual',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const response = this.generateTokens(
        userWithoutProfile,
        currentProfile.id,
        currentProfile,
      );

      this.logger.log(
        `✅ [${this.refreshToken.name}]: Refresh token realizado com sucesso`,
      );

      return response;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        this.logger.warn(`⚠️ [${this.refreshToken.name}]: Token expirado`);

        throw new HttpException('Token expirado', HttpStatus.UNAUTHORIZED);
      }
      if (error.name === 'JsonWebTokenError') {
        this.logger.warn(`⚠️ [${this.refreshToken.name}]: Token inválido`);

        throw new HttpException('Token inválido', HttpStatus.UNAUTHORIZED);
      }

      throw error;
    }
  }

  private generateTokens(
    user: UserWithoutPasswordEntity,
    currentProfileId: number,
    currentProfile: any,
  ): LoginResponseEntity {
    const accessTokenPayload: TokenPayloadEntity = {
      type: 'access',
      sub: user.id,
      email: user.email,
      currentProfileId,
    };

    const refreshTokenPayload: TokenPayloadEntity = {
      type: 'refresh',
      sub: user.id,
      email: user.email,
      currentProfileId,
    };

    const accessToken =
      this.jsonwebtokenService.generateAccessToken(accessTokenPayload);
    const refreshToken =
      this.jsonwebtokenService.generateRefreshToken(refreshTokenPayload);

    return {
      accessToken,
      refreshToken,
      type: 'Bearer',
      currentProfile,
      user,
    };
  }
}
