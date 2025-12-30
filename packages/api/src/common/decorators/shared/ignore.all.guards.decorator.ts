import { SetMetadata } from '@nestjs/common';

export const IGNORE_ALL_GUARDS_KEY = 'ignoreAllGuards';
export const IgnoreAllGuards = () => SetMetadata(IGNORE_ALL_GUARDS_KEY, true);
