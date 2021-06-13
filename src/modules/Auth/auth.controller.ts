import { Controller, Get, Request, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

import { RequireLogin, UserTypes } from '../../core/decorators/auth';

import { UserType } from '../../core/enum';

import { LoginModel } from './model/auth.login.model';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() body: LoginModel) {
    return this.authService.login(body);
  }

  @RequireLogin()
  @UserTypes(UserType.MEMBER)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
