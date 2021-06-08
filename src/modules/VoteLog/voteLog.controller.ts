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
import { VoteLogService } from './voteLog.service';

// models
import {
VoteLogCreateModel,
VoteLogUpdateModel,
VoteLogSearchModel
} from './models';

@Controller('vote-logs')
export class VoteLogController {
  constructor(private readonly voteLogService: VoteLogService) {
  }

  @Post()
  public async create(@Body() body: VoteLogCreateModel) {
    return this.voteLogService.create(body);
  }

  @Put(':_id')
  public async update(@Param() param,@Body() body: VoteLogUpdateModel
  ) {
    return this.voteLogService.update(param._id, body);
  }

  @Get()
  public async find(@Query() query: VoteLogSearchModel) {
    return this.voteLogService.find(query);
  }

  @Get(':_id')
  public async findById(@Param() param, @Query() query?) {
    const result = await this.voteLogService.findById(param._id);
    return result;
  }

  @Delete(':_id')
  public async delete(@Param() param) {
    return this.voteLogService.delete(param._id);
  }
}