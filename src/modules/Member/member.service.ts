import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// interfaces & models
import { MemberCreateModel, MemberSearchModel } from './models';
import { IMember } from './interfaces';

import { bcryptUtils } from '../../core/utils';

const bcrypt = new bcryptUtils();
@Injectable({ scope: Scope.REQUEST })
export class MemberService {
  constructor(
    @InjectModel('Members')
    private readonly memberRepository: Model<IMember>,
  ) {}

  public _castQuery(searchModel: MemberSearchModel) {
    const query: any = {};

    if (searchModel.email) {
      query.email = searchModel.email;
    }
    return query;
  }
  public async create(body: MemberCreateModel) {
    body.password = await bcrypt.encrypt(body.password);
    return this.memberRepository.create(body);
  }

  public async find(searchQuery: MemberSearchModel) {
    const query = this._castQuery(searchQuery);
    const results = await this.memberRepository
      .find(query)
      .skip(((searchQuery.page || 1) - 1) * (searchQuery.limit || 10))
      .limit(searchQuery.limit || 10)
      .exec();

    const total = await this.memberRepository.find(query).count();
    return {
      docs: results,
      limit: searchQuery.limit || 10,
      currentPage: searchQuery.page || 1,
      totalPages: Math.ceil(total / (searchQuery.limit || 10)),
      totalDocs: total,
    };
  }

  public async findById(id) {
    return this.memberRepository.findById(id);
  }
}
