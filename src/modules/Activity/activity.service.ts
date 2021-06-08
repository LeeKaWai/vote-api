import { Injectable, Scope, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import moment from 'moment';

// interfaces & models
import {
  ActivityCreateModel,
  ActivityUpdateModel,
  ActivitySearchModel,
} from './models';
import { IActivity } from './interfaces';

@Injectable({ scope: Scope.REQUEST })
export class ActivityService {
  constructor(
    @InjectModel('Activitys')
    private readonly activityRepository: Model<IActivity>,
  ) {}

  public _castQuery(searchModel: ActivitySearchModel) {
    const query: any = {};
    const {} = searchModel;
    return query;
  }

  public async create(body: ActivityCreateModel) {
    if (new Set(body.candidates).size < 2) {
      throw new Error('候选人最少要两位');
    }
    // if (moment(moment(body.startTime)).diff(Date.now(), 'm') <= 5) {
    //   throw new Error('开始时间要比当前时间最少迟5分钟哦');
    // }
    // if (moment(body.endTime).diff(body.startTime, 'm') < 5) {
    //   throw new Error('一次投票活动时间最少为5分钟哦');
    // }
    return this.activityRepository.create(body);
  }

  public async find(query: ActivitySearchModel) {
    return this.activityRepository.find(query);
  }

  public async findById(id) {
    return this.activityRepository.findById(id);
  }

  public async update(_id, newBody: ActivityUpdateModel) {
    return this.activityRepository.findByIdAndUpdate(_id, newBody, {
      new: true,
    });
  }

  public async delete(_id) {
    return this.activityRepository.findByIdAndDelete(_id);
  }
}
