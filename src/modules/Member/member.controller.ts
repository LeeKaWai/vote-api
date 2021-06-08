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
import { MemberService } from './member.service';

// models
import {
MemberCreateModel,
MemberUpdateModel,
MemberSearchModel
} from './models';

@Controller('members')
export class MemberController {
  constructor(private readonly memberService: MemberService) {
  }

  @Post()
  public async create(@Body() body: MemberCreateModel) {
    return this.memberService.create(body);
  }

  @Put(':_id')
  public async update(@Param() param,@Body() body: MemberUpdateModel
  ) {
    return this.memberService.update(param._id, body);
  }

  @Get()
  public async find(@Query() query: MemberSearchModel) {
    return this.memberService.find(query);
  }

  @Get(':_id')
  public async findById(@Param() param, @Query() query?) {
    const result = await this.memberService.findById(param._id);
    return result;
  }

  @Delete(':_id')
  public async delete(@Param() param) {
    return this.memberService.delete(param._id);
  }
}