import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { createTransactionExtension } from '../extensions';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({ log: ['error', 'info', 'query', 'warn'] });
    const baseClient = new PrismaClient();
    const extendedClient = baseClient.$extends(createTransactionExtension());

    return new Proxy(this, {
      get(target, prop, receiver) {
        if (
          prop in target &&
          typeof prop === 'string' &&
          ['onModuleInit', 'onModuleDestroy'].includes(prop)
        ) {
          return Reflect.get(target, prop, receiver);
        }
        return (extendedClient as any)[prop];
      },
    }) as any;
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
