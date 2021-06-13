import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
import { Match } from '../../../core/decorators/validate';

export class MemberCreateModel {
  @IsEmail()
  email: string;

  @IsString()
  @Matches(/^[a-zA-Z]{1,2}\d{6}\([0-9a-zAZ-Z]\)$/, {
    message: '身份证格式错误',
  })
  idCard: string;

  @IsString()
  @MinLength(6, {
    message: '密码长度最少为6位',
  })
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: '密码强度太弱了,必须包含大小写字母和数字,且最少为6位',
  })
  password: string;

  @IsString()
  @MinLength(6, {
    message: '确认密码长度最少为6位',
  })
  @MaxLength(20)
  @Match('password', {
    message: '密码和确认密码不相同,请重新输入',
  })
  confirmPassword: string;
}
