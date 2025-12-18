import { ProfileEntity } from '../profiles';
import { UserEntity } from './user.entity';

export class UserWithProfileEntity extends UserEntity {
  currentProfile: ProfileEntity;
}
