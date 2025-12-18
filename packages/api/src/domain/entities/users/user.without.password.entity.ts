import { OmitType } from '@nestjs/swagger';
import { UserEntity } from './user.entity';

export class UserWithoutPasswordEntity extends OmitType(UserEntity, [
  'password',
]) {}

export const userWithoutPasswordSelectedFields: Record<
  keyof UserWithoutPasswordEntity,
  true
> = {
  id: true,
  email: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
  active: true,
  settings: true,
  currentProfileId: true,
};
