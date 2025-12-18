import { Profile } from '@prisma/client';

export class ProfileEntity implements Profile {
  id: number;
  name: string;
  document: string | null;
  phone: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
