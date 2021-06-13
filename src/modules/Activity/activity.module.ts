import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Schema, CollectionName } from './schemas/activity.schemas';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';
import { MailModule } from '../Mail/mail.module';
import { VoteLogModule } from '../VoteLog/voteLog.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CollectionName, schema: Schema }]),
    VoteLogModule,
    MailModule,
  ],
  controllers: [ActivityController],
  providers: [ActivityService],
  exports: [ActivityService],
})
export class ActivityModule {}
