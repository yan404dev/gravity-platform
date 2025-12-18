import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersRepository } from './repositories/users.repository';
import { UsersService } from './services/users.service';
import { ProfilesRepository } from './repositories/profiles.repository';
import { UsersProfilesRepository } from './repositories/users.profiles.repository';
import { BcryptModule } from '@/bcrypt';
import { ProfilesService } from './services/profiles.service';
import { ProfilesController } from './controllers/profiles.controller';

@Module({
  imports: [BcryptModule],
  controllers: [UsersController, ProfilesController],
  providers: [
    UsersService,
    UsersRepository,
    ProfilesRepository,
    UsersProfilesRepository,
    ProfilesService,
  ],
  exports: [
    UsersService,
    UsersRepository,
    ProfilesRepository,
    UsersProfilesRepository,
    ProfilesService,
  ],
})
export class UsersModule {}
