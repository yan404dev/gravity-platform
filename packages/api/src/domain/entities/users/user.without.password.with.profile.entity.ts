import { ProfileEntity } from '../profiles';
import { UserWithoutPasswordEntity } from './user.without.password.entity';

export class UserWithoutPasswordWithProfileEntity extends UserWithoutPasswordEntity {
  currentProfile: ProfileEntity;
}
