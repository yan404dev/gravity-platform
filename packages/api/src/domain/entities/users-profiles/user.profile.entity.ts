import { UserProfile } from '@prisma/client';

export class UserProfileEntity implements UserProfile {
  id: number;
  userId: number;
  profileId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  expiresAt: Date | null;
}
