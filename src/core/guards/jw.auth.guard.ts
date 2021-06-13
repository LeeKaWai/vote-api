import {
  ForbiddenException,
  UnauthorizedException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

import {
  REQUIRE_LOGIN_METADATA_KEY,
  USER_STATUS_METADATA_KEY,
  USER_TYPE_METADATA_KEY,
} from '../decorators/auth';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(protected reflector: Reflector) {
    super();
  }

  handleRequest(err: any, user: any, info: any, context: any): any {
    // 验证是否需要登录
    const requireLogin = this.reflector.getAllAndOverride<boolean>(
      REQUIRE_LOGIN_METADATA_KEY,
      [context.getHandler(), context.getClass()],
    );

    // 获取请求路径允许访问的用户类型
    const allowUserTypes = this.reflector.getAllAndOverride<string[]>(
      USER_TYPE_METADATA_KEY,
      [context.getHandler(), context.getClass()],
    );

    // 获取请求路径允许访问的用户状态
    const allowUserStatuses = this.reflector.getAllAndOverride<number[]>(
      USER_STATUS_METADATA_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (err) {
      throw err;
    }

    // 如果获取不到用户信息, 就跳出错误
    if ((requireLogin || allowUserTypes || allowUserStatuses) && !user) {
      throw new UnauthorizedException({
        meesage: '验证失败',
      });
    }

    if (allowUserTypes?.length > 0 && !allowUserTypes.includes(user.userType)) {
      throw new ForbiddenException({
        message: '缺少操作权限',
      });
    }

    if (
      allowUserStatuses?.length > 0 &&
      !allowUserStatuses.includes(user.status)
    ) {
      throw new ForbiddenException({
        message: '缺少操作权限',
      });
    }

    return user;
  }
}
