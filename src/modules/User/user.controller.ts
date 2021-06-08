import {
  Get,
  Put,
  Body,
  Post,
  Patch,
  Param,
  Query,
  Delete,
  Controller,
  UseFilters
} from '@nestjs/common';
// services
import { UserService } from './user.service';

// models
import {
UserCreateModel,
UserUpdateModel,
UserSearchModel
} from './models';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Post()
  public async create(@Body() body: UserCreateModel) {
    return this.userService.create(body);
  }

  @Put(':_id')
  public async update(@Param() param,@Body() body: UserUpdateModel
  ) {
    return this.userService.update(param._id, body);
  }

  @Get()
  public async find(@Query() query: UserSearchModel) {
    return this.userService.find(query);
  }

  @Get(':_id')
  public async findById(@Param() param, @Query() query?) {
    const result = await this.userService.findById(param._id);
    return result;
  }

  @Delete(':_id')
  public async delete(@Param() param) {
    return this.userService.delete(param._id);
  }
}