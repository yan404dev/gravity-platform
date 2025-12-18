import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';
import { AlsService, X_TRACE_ID_CONSTANT } from '@/als';
import { Logger } from '@nestjs/common';

@Injectable()
export class TracingMiddleware implements NestMiddleware {
  private readonly logger = new Logger(TracingMiddleware.name);
  constructor(private readonly alsService: AlsService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const traceId = req.headers['x-tracing-id'] || randomUUID();

    res.setHeader('x-trace-id', traceId);

    const store = {
      [X_TRACE_ID_CONSTANT]: String(traceId),
    };

    this.alsService.run(store, () => {
      this.logger.log(`Setando tracing id: ${String(traceId)}`);
      next();
    });
  }
}
