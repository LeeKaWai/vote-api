import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import { Schema, CollectionName } from './schemas/user.schemas';
import { UserController } from './user.controller';
import { UserService } from './user.service';


@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}])
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}