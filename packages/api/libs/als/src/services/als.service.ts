import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { AlsContextNotFoundException } from '../exceptions';

export interface DynamicContext {
  [key: string]: any;
}

@Injectable()
export class AlsService {
  private readonly asyncLocalStorage = new AsyncLocalStorage<DynamicContext>();

  run<T>(context: DynamicContext, callback: () => T): T {
    return this.asyncLocalStorage.run(context, callback);
  }

  getContext(): DynamicContext | undefined {
    return this.asyncLocalStorage.getStore();
  }

  get<T = any>(key: string): T | undefined {
    const context = this.asyncLocalStorage.getStore();
    return context?.[key] as T;
  }

  getOrThrowError<T = any>(key: string): T {
    const value = this.get(key);
    if (!value) {
      throw new AlsContextNotFoundException(key);
    }
    return value;
  }

  set(key: string, value: any): void {
    const context = this.asyncLocalStorage.getStore();
    if (context) {
      context[key] = value;
    }
  }

  hasContext(): boolean {
    return this.asyncLocalStorage.getStore() !== undefined;
  }

  has(key: string): boolean {
    const context = this.asyncLocalStorage.getStore();
    return context ? key in context : false;
  }

  delete(key: string): boolean {
    const context = this.asyncLocalStorage.getStore();
    if (context && key in context) {
      delete context[key];
      return true;
    }
    return false;
  }

  keys(): string[] {
    const context = this.asyncLocalStorage.getStore();
    return context ? Object.keys(context) : [];
  }

  clear(): void {
    const context = this.asyncLocalStorage.getStore();
    if (context) {
      Object.keys(context).forEach((key) => delete context[key]);
    }
  }

  merge(data: DynamicContext): void {
    const context = this.asyncLocalStorage.getStore();
    if (context) {
      Object.assign(context, data);
    }
  }
}
