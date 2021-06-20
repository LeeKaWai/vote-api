import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';
import { Match } from '../../../core/decorators/validate';
export class UserCreateModel {
  @IsEmail()
  @ApiProperty({ type: String, description: '邮箱' })
  email: string;

  @IsString()
  @MinLength(6, {
    message: '密码长度最少为6位',
  })
  @MaxLength(20)
  @ApiProperty({ type: String, description: '密码，长度最少为6位' })
  password: string;

  @IsString()
  @MinLength(6, {
    message: '确认密码长度最少为6位',
  })
  @MaxLength(20)
  @Match('password', {
    message: '密码和确认密码不相同,请重新输入',
  })
  @ApiProperty({ type: String, description: '确认密码' })
  confirmPassword: string;
}
