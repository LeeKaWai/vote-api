import { Get, Body, Post, Param, Query, Controller } from '@nestjs/common';
// services
import { MemberService } from './member.service';

// models
import { MemberCreateModel, MemberSearchModel } from './models';

@Controller('members')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  public async create(@Body() body: MemberCreateModel) {
    return this.memberService.create(body);
  }

  @Get()
  public async find(@Query() query: MemberSearchModel) {
    return this.memberService.find(query);
  }

  @Get(':_id')
  public async findById(@Param() param) {
    const result = await this.memberService.findById(param._id);
    return result;
  }
}
