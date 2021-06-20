import { IsString, IsEmail, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserType } from '../../../core/enum';

export class LoginModel {
  @IsEmail()
  @ApiProperty({ type: String, description: '邮箱' })
  email: string;

  @IsString()
  @ApiProperty({ type: String, description: '密码' })
  password: string;

  @IsEnum(UserType)
  @ApiProperty({ enum: ['admin', 'member'] })
  userType: UserType;
}
