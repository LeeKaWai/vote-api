import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import { Schema, CollectionName } from './schemas/voteLog.schemas';
import { VoteLogController } from './voteLog.controller';
import { VoteLogService } from './voteLog.service';


@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}])
  ],
  controllers: [VoteLogController],
  providers: [VoteLogService],
  exports: [VoteLogService]
})
export class VoteLogModule {}