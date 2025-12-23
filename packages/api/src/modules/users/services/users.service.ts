import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UsersRepository } from '../repositories/users.repository';
import { SearchUserDto, UserOnboardingDto } from 'src/domain/dtos';
import { ProfilesRepository } from '../repositories/profiles.repository';
import { UsersProfilesRepository } from '../repositories/users.profiles.repository';
import { BcryptService } from '@/bcrypt';
import { QueryBuilderService } from '@/query-builder';
import { Transaction } from '@/prisma';
import {
  ResultEntity,
  UserEntity,
  UserWithoutPasswordEntity,
  UserWithoutPasswordWithProfileEntity,
  UserWithProfileEntity,
} from 'src/domain/entities';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly profilesRepository: ProfilesRepository,
    private readonly usersProfilesRepository: UsersProfilesRepository,
    private readonly bcryptService: BcryptService,
    private readonly queryBuilderService: QueryBuilderService,
  ) {}

  @Transaction()
  async onboarding({
    profile: profileDto,
    ...dto
  }: UserOnboardingDto): Promise<UserWithoutPasswordWithProfileEntity> {
    this.logger.log(
      `⚙️ [${this.onboarding.name}]: Starting onboarding: ${dto.email}`,
    );
    const existByEmail = await this.usersRepository.existByEmail(dto.email);

    if (existByEmail) {
      this.logger.warn(`⚠️ Email already registered: ${dto.email}`);
      throw new HttpException('Email already registered', HttpStatus.CONFLICT);
    }

    const hash = await this.bcryptService.hash(dto.password);

    const profile = await this.profilesRepository.create(profileDto);

    const user = await this.usersRepository.create({
      ...dto,
      profileId: profile.id,
      password: hash,
    });

    await this.usersProfilesRepository.create({
      userId: user.id,
      profileId: profile.id,
    });

    const userWithCurrentProfile: UserWithoutPasswordWithProfileEntity = {
      ...user,
      currentProfile: profile,
    };

    this.logger.log(
      `✅ User created successfully: ${dto.email} (ID: ${user.id})`,
    );
    return userWithCurrentProfile;
  }

  async search(
    queryParams: SearchUserDto,
  ): Promise<ResultEntity<UserWithoutPasswordEntity>> {
    this.logger.debug(`🔍 [${this.search.name}]: Searching users`);

    const { query } = this.queryBuilderService
      .date('createdAt', queryParams.dataInicio, queryParams.dataFim)
      .pagination(queryParams.page, queryParams.perPage)
      .sort(queryParams.orderBy);

    const [data, total] = await this.usersRepository.search(query);

    this.logger.debug(`Found ${data.length} users out of ${total} total`);

    const info = {
      page: queryParams.page,
      pages: Math.ceil(total / queryParams.perPage),
      perPage: queryParams.perPage,
      total,
    };

    return { data, info };
  }

  async findByEmail(email: string): Promise<UserWithProfileEntity> {
    const user = await this.usersRepository.getByEmail(email);

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return user;
  }

  async findById(id: number): Promise<UserWithoutPasswordEntity> {
    const user = await this.usersRepository.getById(id);

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return user;
  }

  async findByIdWithCurrentProfile(id: number): Promise<UserWithoutPasswordWithProfileEntity> {
    const user = await this.usersRepository.getByIdWithCurrentProfile(id);

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return user;
  }

  async existsById(id: number): Promise<void> {
    const user = await this.profilesRepository.existsById(id);

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async softDelete(id: number): Promise<UserWithoutPasswordEntity> {
    const user = await this.findById(id);

    const softDelete = await this.usersRepository.softDelete(user.id);

    if (!softDelete)
      throw new HttpException(
        'Failed to delete user',
        HttpStatus.NOT_ACCEPTABLE,
      );

    return softDelete;
  }
}
