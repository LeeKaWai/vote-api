import { ApiCreatedResponse, ApiBody } from '@nestjs/swagger';
import { Get, Body, Post, Param, Query, Controller } from '@nestjs/common';
// services
import { MemberService } from './member.service';

// models
import { MemberCreateModel, MemberSearchModel } from './models';

@Controller('members')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  @ApiCreatedResponse({ description: '创建会员' })
  @ApiBody({ type: MemberCreateModel })
  public async create(@Body() body: MemberCreateModel) {
    return this.memberService.create(body);
  }

  @Get()
  @ApiCreatedResponse({ description: '查询会员' })
  @ApiBody({ type: MemberSearchModel })
  public async find(@Query() query: MemberSearchModel) {
    return this.memberService.find(query);
  }

  @Get(':_id')
  @ApiCreatedResponse({ description: '根据会员Id查询会员信息' })
  public async findById(@Param() param) {
    const result = await this.memberService.findById(param._id);
    return result;
  }
}
