import { PrismaService } from '@/prisma';
import { Injectable } from '@nestjs/common';
import { CreateUsersProfilesDto } from 'src/domain/dtos';
import { UserProfileEntity } from 'src/domain/entities';

@Injectable()
export class UsersProfilesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(dto: CreateUsersProfilesDto): Promise<UserProfileEntity> {
    return this.prismaService.userProfile.create({
      data: {
        ...dto,
        deletedAt: null,
      },
    });
  }
}
