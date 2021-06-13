import { IsString, IsEnum, IsOptional } from 'class-validator';
import { ActivityStatus } from '../../../core/enum';
export class ActivityUpdateModel {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEnum(ActivityStatus)
  @IsOptional()
  status: ActivityStatus;
}
