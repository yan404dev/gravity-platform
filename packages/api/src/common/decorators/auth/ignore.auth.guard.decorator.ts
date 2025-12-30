import { SetMetadata } from '@nestjs/common';

export const IGNORE_AUTH_GUARD_KEY = 'ignoreAuthGuard';
export const IgnoreAuthGuard = () => SetMetadata(IGNORE_AUTH_GUARD_KEY, true);
