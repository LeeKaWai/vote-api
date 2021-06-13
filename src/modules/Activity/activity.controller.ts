import {
  Get,
  Put,
  Body,
  Post,
  Query,
  Param,
  Controller,
  Patch,
} from '@nestjs/common';
// services
import { ActivityService } from './activity.service';

// models
import {
  ActivityCreateModel,
  ActivityUpdateModel,
  ActivitySearchModel,
  ActivityVoteModel,
} from './models';

import { RequireLogin, UserTypes, CurrentUser } from '../../core/decorators';

import { UserType } from '../../core/enum';

@Controller('activitys')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @RequireLogin()
  @UserTypes(UserType.ADMIN)
  @Post('/create')
  public async create(@Body() body: ActivityCreateModel) {
    return this.activityService.create(body);
  }

  @RequireLogin()
  @UserTypes(UserType.ADMIN)
  @Put(':_id')
  public async update(@Param() param, @Body() body: ActivityUpdateModel) {
    return this.activityService.update(param._id, body);
  }

  @RequireLogin()
  @UserTypes(UserType.ADMIN)
  @Post('/add/:_id/candidates')
  public async addCandidates(@Param() param, @Body() body: any) {
    return this.activityService.addCandidates(param._id, body.names);
  }

  @RequireLogin()
  @UserTypes(UserType.ADMIN)
  @Patch('/update/:_id/status')
  public async updateStatus(@Param() param, @Body() body: ActivityUpdateModel) {
    return this.activityService.updateStatus(param._id, body.status);
  }

  @Get()
  public async find(@Query() query: ActivitySearchModel) {
    return this.activityService.find(query);
  }

  @Get(':_id')
  public async findById(@Param() param) {
    const result = await this.activityService.findById(param._id);
    return result;
  }

  @RequireLogin()
  @UserTypes(UserType.MEMBER)
  @Post('/vote')
  public async vote(
    @Body() body: ActivityVoteModel,
    @CurrentUser() currentUser,
  ) {
    return this.activityService.vote(body, currentUser);
  }

  @Get('/:activityId/voting')
  public async getVoting(@Param() param, @Query() query) {
    return this.activityService.getVoting(param.activityId, query?.candidateId);
  }
}
