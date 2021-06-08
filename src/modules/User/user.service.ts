import {Injectable, Scope, Inject} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import { Model } from 'mongoose';

// interfaces & models
import {
  UserCreateModel,
  UserUpdateModel,
  UserSearchModel
} from './models';
import { IUser } from './interfaces';

@Injectable({scope: Scope.REQUEST})
export class UserService {
  constructor(
    @InjectModel('Users') private readonly userRepository: Model<IUser>
  ) {}

  public _castQuery(searchModel: UserSearchModel) {
    const query: any = {};
    const {} = searchModel;
    return query;
  }

  public async create(body: UserCreateModel) {
    return this.userRepository.create(body);
  }

  public async find(query: UserSearchModel) {
    return this.userRepository.find(query)
  }

  public async findById(id){
    return this.userRepository.findById(id);
  }

  public async update(_id, newBody:UserUpdateModel) {
    return this.userRepository.findByIdAndUpdate(_id, newBody, { new: true });
  }

  public async delete(_id){
    return this.userRepository.findByIdAndDelete(_id);
  }
}