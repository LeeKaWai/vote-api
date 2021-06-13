import { IsString, IsEmail, IsEnum } from 'class-validator';

import { UserType } from '../../../core/enum';

export class LoginModel {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(UserType)
  userType: UserType;
}
