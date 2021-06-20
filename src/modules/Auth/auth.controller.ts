import { Controller, Post, Body } from '@nestjs/common';
import { ApiCreatedResponse, ApiBody } from '@nestjs/swagger';

import { AuthService } from './auth.service';

import { LoginModel } from './model/auth.login.model';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiCreatedResponse({ description: '登录' })
  @ApiBody({ type: LoginModel })
  async login(@Body() body: LoginModel) {
    return this.authService.login(body);
  }
}
