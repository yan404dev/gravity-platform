import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import {
  ACCESS_TOKEN_CONSTANT,
  AlsService,
  IP_ADDRESS_CONSTANT,
  USER_AGENT_CONSTANT,
  X_CURRENT_PROFILE_ID_CONSTANT,
  X_TIMEZONE_CONSTANT,
} from '@/als';

@Injectable()
export class MetadataMiddleware implements NestMiddleware {
  private readonly logger = new Logger(MetadataMiddleware.name);
  constructor(private readonly alsService: AlsService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const url = req.originalUrl;

    this.logger.log(`Iniciando endpoint: ${url}`);

    const xPerfilAtualId = req.headers['x-perfil-atual-id'];
    const xRealIp = req.headers['x-real-ip'];
    const xTimezone = req.headers['x-timezone'];
    const userAgent = req.headers['user-agent'];
    const token = req.headers['authorization']?.split(' ')?.[1];

    const store = {
      endpoint: url,
      [USER_AGENT_CONSTANT]: userAgent,
      [X_TIMEZONE_CONSTANT]: xTimezone,
      [X_CURRENT_PROFILE_ID_CONSTANT]:
        xPerfilAtualId && !Number.isNaN(Number(xPerfilAtualId))
          ? Number(xPerfilAtualId)
          : undefined,
      [IP_ADDRESS_CONSTANT]: xRealIp ? String(xRealIp) : undefined,
      [ACCESS_TOKEN_CONSTANT]: token ? String(token) : undefined,
    };

    this.alsService.merge(store);
    this.logger.log(`Setando metadata: ${JSON.stringify(store)}`);
    next();
  }
}
