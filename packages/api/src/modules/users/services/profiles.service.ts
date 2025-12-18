import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ProfilesRepository } from '../repositories/profiles.repository';
import { ProfileEntity } from 'src/domain/entities';
import { UpdateProfileDto } from 'src/domain/dtos';

@Injectable()
export class ProfilesService {
  private readonly logger = new Logger(ProfilesService.name);

  constructor(private readonly profilesRepository: ProfilesRepository) {}

  async findById(id: number): Promise<ProfileEntity> {
    this.logger.debug(`🔍 [${this.findById.name}]: Finding profile ID: ${id}`);
    const profile = await this.profilesRepository.getById(id);

    if (!profile) {
      this.logger.warn(`⚠️ Profile not found: ${id}`);
      throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
    }

    return profile;
  }

  async update(id: number, dto: UpdateProfileDto): Promise<ProfileEntity> {
    this.logger.log(`⚙️ [${this.update.name}]: Updating profile ID: ${id}`);
    const profile = await this.findById(id);

    const update = await this.profilesRepository.update(profile.id, dto);

    if (!update)
      throw new HttpException(
        'Failed to update profile',
        HttpStatus.NOT_ACCEPTABLE,
      );

    return update;
  }
}
