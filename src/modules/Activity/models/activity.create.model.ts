import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ type: String, description: '名字' })
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(2)
  @Type(() => ActivityCandidateModel)
  @ApiProperty({ type: Array, description: '候选人' })
  candidates: ActivityCandidateModel[];

  @IsAfterNow('startTime', {
    message: '开始时间要比当前时间大最少10分钟',
  })
  @ApiProperty({ type: Date, description: '开始时间' })
  startTime: Date;

  @IsAfter('startTime', {
    message: '结束时间大于开始时间,并且要比当前时间大最少10分钟',
  })
  @ApiProperty({ type: Date, description: '结束时再见' })
  endTime: Date;

  @IsEnum(ActivityStatus)
  @ApiProperty({ enum: ['UNSTART', 'PROCESSING', 'ENDED'] })
  status: ActivityStatus;
}
