import { Prisma, User } from '@prisma/client';

export class UserEntity implements User {
  id: number;
  email: string;
  password: string;
  active: boolean;
  settings: Prisma.JsonValue;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  currentProfileId: number;
}
