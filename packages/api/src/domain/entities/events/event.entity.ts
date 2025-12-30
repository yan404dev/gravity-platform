import { $Enums, Event, Prisma } from '@prisma/client';

export class EventEntity implements Event {
  id: number;
  title: string;
  description: string | null;
  startDate: Date;
  endDate: Date;
  category: string | null;
  privacy: $Enums.EventPrivacy;
  latitude: number;
  longitude: number;
  status: $Enums.EventStatus;
  thumbnailUrl: string | null;
  bannerUrl: string | null;
  tags: string[];
  timezone: string;
  city: string;
  address: string;
  number: string | null;
  price: Prisma.Decimal;
  createdById: number;
  updatedById: number | null;
  deletedById: number | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
