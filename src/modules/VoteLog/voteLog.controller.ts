import { Get, Param, Query, Controller } from '@nestjs/common';
// services
import { VoteLogService } from './voteLog.service';

// models
import { VoteLogSearchModel } from './models';

import { RequireLogin, UserTypes } from '../../core/decorators';
import { UserType } from '../../core/enum';
@RequireLogin()
@UserTypes(UserType.ADMIN)
@Controller('vote-logs')
export class VoteLogController {
  constructor(private readonly voteLogService: VoteLogService) {}

  @Get()
  public async find(@Query() query: VoteLogSearchModel) {
    return this.voteLogService.find(query);
  }

  @Get(':_id')
  public async findById(@Param() param) {
    const result = await this.voteLogService.findById(param._id);
    return result;
  }
}
