import { Body, Post, Controller, Get, Query } from '@nestjs/common';
// services
import { UserService } from './user.service';

// models
import { UserCreateModel } from './models';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  public async create(@Body() body: UserCreateModel): Promise<any> {
    return this.userService.create(body);
  }
  @Get()
  public async find(@Query() query): Promise<any> {
    return this.userService.find(query);
  }
}
