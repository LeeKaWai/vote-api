import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import { Schema, CollectionName } from './schemas/activity.schemas';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';


@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}])
  ],
  controllers: [ActivityController],
  providers: [ActivityService],
  exports: [ActivityService]
})
export class ActivityModule {}