import {Injectable, Scope, Inject} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import { Model } from 'mongoose';

// interfaces & models
import {
  MemberCreateModel,
  MemberUpdateModel,
  MemberSearchModel
} from './models';
import { IMember } from './interfaces';

@Injectable({scope: Scope.REQUEST})
export class MemberService {
  constructor(
    @InjectModel('Members') private readonly memberRepository: Model<IMember>
  ) {}

  public _castQuery(searchModel: MemberSearchModel) {
    const query: any = {};
    const {} = searchModel;
    return query;
  }

  public async create(body: MemberCreateModel) {
    return this.memberRepository.create(body);
  }

  public async find(query: MemberSearchModel) {
    return this.memberRepository.find(query)
  }

  public async findById(id){
    return this.memberRepository.findById(id);
  }

  public async update(_id, newBody:MemberUpdateModel) {
    return this.memberRepository.findByIdAndUpdate(_id, newBody, { new: true });
  }

  public async delete(_id){
    return this.memberRepository.findByIdAndDelete(_id);
  }
}