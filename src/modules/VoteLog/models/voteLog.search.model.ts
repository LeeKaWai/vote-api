import { IsOptional, IsNumber, IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';
export class VoteLogSearchModel {
  @IsOptional()
  @IsMongoId()
  memberId?: string;

  @IsMongoId()
  activityId: string;

  @IsMongoId()
  candidateId: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number;
}
