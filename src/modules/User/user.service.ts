import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// interfaces & models
import { UserCreateModel, UserUpdateModel, UserSearchModel } from './models';
import { IUser } from './interfaces';

import { bcryptUtils } from '../../core/utils';
const bcrypt = new bcryptUtils();
@Injectable({ scope: Scope.REQUEST })
export class UserService {
  constructor(
    @InjectModel('Users') private readonly userRepository: Model<IUser>,
  ) {}

  public _castQuery(searchModel: UserSearchModel) {
    const query: any = {};
    if (searchModel.email) {
      query.email = searchModel.email;
    }
    return query;
  }

  public async create(body: UserCreateModel): Promise<any> {
    if (body.password !== body.confirmPassword) {
      throw new Error('两次密码不相同，请重新输入');
    }

    body.password = await bcrypt.encrypt(body.password);
    return this.userRepository.create(body);
  }

  public async find(searchQuery: UserSearchModel) {
    const query = this._castQuery(searchQuery);
    const results = await this.userRepository
      .find(query)
      .skip(((searchQuery.page || 1) - 1) * (searchQuery.limit || 10))
      .limit(searchQuery.limit || 10)
      .exec();

    const total = await this.userRepository.find(query).count();
    return {
      docs: results,
      limit: searchQuery.limit || 10,
      currentPage: searchQuery.page || 1,
      totalPages: Math.ceil(total / (searchQuery.limit || 10)),
      totalDocs: total,
    };
  }
  public async findOne(query) {
    return this.userRepository.findOne(query);
  }

  public async update(_id, newBody: UserUpdateModel) {
    return this.userRepository.findByIdAndUpdate(_id, newBody, { new: true });
  }

  public async delete(_id) {
    return this.userRepository.findByIdAndDelete(_id);
  }
}
