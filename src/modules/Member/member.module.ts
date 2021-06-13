import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Schema, CollectionName } from './schemas/member.schemas';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';

@Module({
  imports: [
    MongooseModule.forFeature([{name: CollectionName, schema: Schema}])
  ],
  controllers: [MemberController],
  providers: [MemberService],
  exports: [MemberService],
})
export class MemberModule {}
