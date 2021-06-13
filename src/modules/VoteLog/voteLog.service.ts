import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';

// interfaces & models
import {
  VoteLogCreateModel,
  VoteLogUpdateModel,
  VoteLogSearchModel,
} from './models';
import { IVoteLog } from './interfaces';

import { CacheService } from '../Cache/cache.service';

@Injectable()
export class VoteLogService {
  constructor(
    @InjectModel('VoteLogs')
    private readonly voteLogRepository: Model<IVoteLog>,
    private readonly cacheService: CacheService,
  ) {}

  public _castQuery(searchModel: VoteLogSearchModel) {
    const query: any = {};
    if (searchModel.candidateId) {
      query.candidateId = searchModel.candidateId;
    }
    if (searchModel.activityId) {
      query.activityId = searchModel.activityId;
    }
    return query;
  }

  public async create(body: VoteLogCreateModel) {
    return this.voteLogRepository.create(body);
  }

  public async find(searchQuery: VoteLogSearchModel) {
    const query = this._castQuery(searchQuery);
    if (searchQuery.isPagination) {
      const results = await this.voteLogRepository
        .find(query)
        .populate({
          path: 'memberId',
        })
        .skip(((searchQuery.page || 1) - 1) * (searchQuery.limit || 10))
        .limit(searchQuery.limit || 10)
        .exec();

      const total = await this.voteLogRepository.find(query).count();
      return {
        docs: results,
        limit: searchQuery.limit || 10,
        currentPage: searchQuery.page || 1,
        totalPages: Math.ceil(total / (searchQuery.limit || 10)),
        totalDocs: total,
      };
    } else {
      return this.voteLogRepository
        .find(query)
        .populate({
          path: 'memberId',
        })
        .lean();
    }
  }

  public async findById(id) {
    return this.voteLogRepository.findById(id);
  }

  public async findOneByMemberId(query: any) {
    const cache = await this.cacheService.get(`vl:${JSON.stringify(query)}`);
    if (cache) {
      return cache;
    }
    const log = await this.voteLogRepository.findOne({
      activityId: query.activityId,
      candidateId: query.candidateId,
      memberId: query.memberId,
    });
    await this.cacheService.set(`vl:${JSON.stringify(query)}`, log);
    return log;
  }

  public async groupByActivity(activityId) {
    return this.voteLogRepository.aggregate([
      { $match: { activityId: new ObjectId(activityId) } },
      {
        $group: {
          _id: { activityId: '$activityId', candidateId: '$candidateId' },
          count: { $sum: 1 },
        },
      },
    ]);
  }

  public async update(_id, newBody: VoteLogUpdateModel) {
    return this.voteLogRepository.findByIdAndUpdate(_id, newBody, {
      new: true,
    });
  }

  public async delete(_id) {
    return this.voteLogRepository.findByIdAndDelete(_id);
  }
}
