import { IsMongoId } from 'class-validator';

/**
 * 投票 model
 */
export class ActivityVoteModel {
  @IsMongoId()
  activityId: string; // 活动Id

  @IsMongoId()
  candidateId: string; // 获选人
}
