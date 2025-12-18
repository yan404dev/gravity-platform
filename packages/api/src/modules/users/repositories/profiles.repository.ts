import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma';
import { ProfileEntity } from 'src/domain/entities';
import { CreateProfileDto, UpdateProfileDto } from 'src/domain/dtos';

@Injectable()
export class ProfilesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(dto: CreateProfileDto): Promise<ProfileEntity> {
    return this.prismaService.profile.create({
      data: {
        ...dto,
        deletedAt: null,
      },
    });
  }

  async existsById(id: number): Promise<boolean> {
    const count = await this.prismaService.profile.count({
      where: {
        id,
        deletedAt: null,
      },
    });

    return !!count;
  }

  getById(id: number): Promise<ProfileEntity | null> {
    return this.prismaService.profile.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  update(id: number, dto: UpdateProfileDto): Promise<ProfileEntity> {
    return this.prismaService.profile.update({
      where: {
        id,
      },
      data: dto,
    });
  }
}
