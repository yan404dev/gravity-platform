import { IsEmail, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateProfileDto } from '../profiles';

export class UserOnboardingDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @Type(() => CreateProfileDto)
  @ValidateNested()
  @IsNotEmpty()
  profile: CreateProfileDto;
}
