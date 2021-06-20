import { IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * 投票 model
 */
export class ActivityVoteModel {
  @IsMongoId()
  @ApiProperty({ type: String, description: '活动Id' })
  activityId: string; // 活动Id

  @IsMongoId()
  @ApiProperty({ type: String, description: '候选人Id' })
  candidateId: string; // 获选人
}
