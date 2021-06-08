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
  UseFilters,
} from '@nestjs/common';
// services
import { ActivityService } from './activity.service';

// models
import {
  ActivityCreateModel,
  ActivityUpdateModel,
  ActivitySearchModel,
} from './models';

@Controller('activitys')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post()
  public async create(@Body() body: ActivityCreateModel) {
    return this.activityService.create(body);
  }

  @Put(':_id')
  public async update(@Param() param, @Body() body: ActivityUpdateModel) {
    return this.activityService.update(param._id, body);
  }

  @Get()
  public async find(@Query() query: ActivitySearchModel) {
    return this.activityService.find(query);
  }

  @Get(':_id')
  public async findById(@Param() param, @Query() query?) {
    const result = await this.activityService.findById(param._id);
    return result;
  }

  @Delete(':_id')
  public async delete(@Param() param) {
    return this.activityService.delete(param._id);
  }
}
