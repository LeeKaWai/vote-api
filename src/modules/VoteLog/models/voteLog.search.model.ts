import { IsOptional, IsNumber, IsMongoId, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
export class VoteLogSearchModel {
  @IsOptional()
  @IsMongoId()
  memberId?: string;

  @IsMongoId()
  activityId: string;

  @IsMongoId()
  @IsOptional()
  candidateId?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number;

  @IsOptional()
  @IsBoolean()
  isPagination?: boolean;
}
