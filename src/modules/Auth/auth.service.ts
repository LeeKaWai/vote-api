import {
  Injectable,
  HttpStatus,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as jwt from 'jsonwebtoken';
import { Model } from 'mongoose';

import { UserType } from 'src/core/enum';
import { bcryptUtils } from 'src/core/utils';

import { IUser } from '../User/interfaces';
import { IMember } from '../Member/interfaces';
import { LoginModel } from './model/auth.login.model';

const bcrypt = new bcryptUtils();
@Injectable()
export class AuthService {
  constructor(
    @InjectModel('Users') protected readonly userRepository: Model<IUser>,
    @InjectModel('Members') protected readonly memberRepository: Model<IMember>,
  ) {}

  async validateUser(email: string, userType: UserType): Promise<any> {
    switch (userType) {
      case UserType.ADMIN:
        const user = await this.userRepository.findOne({ email: email });
        if (!user) {
          throw new UnauthorizedException();
        }
        return user;

      case UserType.MEMBER:
        const member = await this.memberRepository.findOne({ email: email });
        if (!member) {
          throw new UnauthorizedException();
        }
        return member;
    }
  }

  /**
   * 登录
   * @param body
   */
  async login(body: LoginModel): Promise<any> {
    let access_token = '';
    switch (body.userType) {
      case UserType.ADMIN:
        access_token = await this.adminLogin(body);
        break;
      case UserType.MEMBER:
        access_token = await this.memberLogin(body);
        break;
    }
    return {
      access_token,
    };
  }

  /**
   * 管理员登录验证逻辑
   * @param body  login model
   */
  async adminLogin(body: LoginModel): Promise<any> {
    const user = await this.userRepository.findOne({ email: body.email });
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: '用户名不存在。',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const isMatch = await bcrypt.compare(body.password, user.password);
    if (!isMatch || user.status !== true) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: '验证失败, 用户名或密码错误。',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    const payload = {
      email: body.email,
      sub: user._id,
      userType: UserType.ADMIN,
    };
    return this.generateJwtToken(payload, process.env.JWT_SECRET);
  }

  /**
   * 会员登录验证逻辑
   * @param body login model
   */
  async memberLogin(body: LoginModel): Promise<any> {
    const member = await this.memberRepository.findOne({ email: body.email });
    if (!member) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: '用户名不存在。',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const isMatch = await bcrypt.compare(body.password, member.password);
    if (!isMatch || member.status !== true) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: '验证失败, 用户名或密码错误。',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    const payload = {
      email: body.email,
      sub: member._id,
      userType: UserType.MEMBER,
    };
    return this.generateJwtToken(payload, process.env.JWT_SECRET);
  }

  /**
   * 生成 jwtoken
   * @param payload 载体
   * @param secret 密钥 默认为 env JWT_SECRET
   */
  async generateJwtToken(payload: any, secret: string): Promise<any> {
    return jwt.sign(payload, secret || process.env.JWT_SECRET);
  }
}
