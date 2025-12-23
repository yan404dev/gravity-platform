import { ProfileEntity } from '../profiles';
import { UserWithoutPasswordEntity } from '../users';

export class LoginResponseEntity {
  accessToken: string;
  refreshToken: string;
  type: string;
  currentProfile: ProfileEntity;
  user: UserWithoutPasswordEntity;
}
