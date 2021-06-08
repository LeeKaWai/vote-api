import {Injectable, Scope, Inject} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import { Model } from 'mongoose';

// interfaces & models
import {
  VoteLogCreateModel,
  VoteLogUpdateModel,
  VoteLogSearchModel
} from './models';
import { IVoteLog } from './interfaces';

@Injectable({scope: Scope.REQUEST})
export class VoteLogService {
  constructor(
    @InjectModel('VoteLogs') private readonly voteLogRepository: Model<IVoteLog>
  ) {}

  public _castQuery(searchModel: VoteLogSearchModel) {
    const query: any = {};
    const {} = searchModel;
    return query;
  }

  public async create(body: VoteLogCreateModel) {
    return this.voteLogRepository.create(body);
  }

  public async find(query: VoteLogSearchModel) {
    return this.voteLogRepository.find(query)
  }

  public async findById(id){
    return this.voteLogRepository.findById(id);
  }

  public async update(_id, newBody:VoteLogUpdateModel) {
    return this.voteLogRepository.findByIdAndUpdate(_id, newBody, { new: true });
  }

  public async delete(_id){
    return this.voteLogRepository.findByIdAndDelete(_id);
  }
}