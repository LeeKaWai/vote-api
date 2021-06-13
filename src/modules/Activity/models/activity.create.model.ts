import {
  IsString,
  IsArray,
  IsEnum,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ActivityCandidateModel } from './activity.candidate.model';
import { ActivityStatus } from '../../../core/enum';
import { IsAfter, IsAfterNow } from '../../../core/decorators';

export class ActivityCreateModel {
  @IsString()
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(2)
  @Type(() => ActivityCandidateModel)
  candidates: ActivityCandidateModel[];

  @IsAfterNow('startTime', {
    message: '开始时间要比当前时间大最少10分钟',
  })
  startTime: Date;

  @IsAfter('startTime', {
    message: '结束时间大于开始时间,并且要比当前时间大最少10分钟',
  })
  endTime: Date;

  @IsEnum(ActivityStatus)
  status: ActivityStatus;
}
