import { PrismaService } from '@/prisma';
import { QueryBuilderEntity } from '@/query-builder';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/domain/dtos';
import {
  UserEntity,
  UserWithoutPasswordEntity,
  userWithoutPasswordSelectedFields,
  UserWithProfileEntity,
  UserWithoutPasswordWithProfileEntity,
} from 'src/domain/entities';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(dto: CreateUserDto): Promise<UserWithoutPasswordEntity> {
    return this.prismaService.user.create({
      data: {
        email: dto.email,
        password: dto.password,
        currentProfile: {
          connect: {
            id: dto.profileId,
          },
        },
        deletedAt: null,
      },
      select: userWithoutPasswordSelectedFields,
    });
  }

  async existByEmail(email: string): Promise<boolean> {
    const user = await this.prismaService.user.findFirst({
      where: {
        email,
        deletedAt: null,
      },
    });

    return !!user;
  }

  getByEmail(email: string): Promise<UserWithProfileEntity | null> {
    return this.prismaService.user.findFirst({
      where: {
        email,
        deletedAt: null,
      },
      include: {
        currentProfile: true,
      },
    });
  }

  search(
    query: QueryBuilderEntity,
  ): Promise<[UserWithoutPasswordEntity[], number]> {
    return Promise.all([
      this.prismaService.user.findMany({
        ...query,
        select: userWithoutPasswordSelectedFields,
      }),
      this.prismaService.user.count({
        where: query?.where,
      }),
    ]);
  }

  getById(id: number): Promise<UserWithoutPasswordEntity | null> {
    return this.prismaService.user.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      select: userWithoutPasswordSelectedFields,
    });
  }

  getByIdWithPassword(id: number): Promise<UserEntity | null> {
    return this.prismaService.user.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  getByIdWithCurrentProfile(
    id: number,
  ): Promise<UserWithoutPasswordWithProfileEntity | null> {
    return this.prismaService.user.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      select: {
        ...userWithoutPasswordSelectedFields,
        currentProfile: true,
      },
    });
  }

  softDelete(id: number): Promise<UserWithoutPasswordEntity> {
    return this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
      select: userWithoutPasswordSelectedFields,
    });
  }
}
