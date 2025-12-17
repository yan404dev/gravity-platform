import { HttpException, HttpStatus } from '@nestjs/common';

export class AlsContextNotFoundException extends HttpException {
  constructor(key: string) {
    super(`Key "${key}" not found in context`, HttpStatus.NOT_FOUND);
  }
}
