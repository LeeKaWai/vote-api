import {
  IsString,
  IsArray,
  IsEmpty,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ActivityCandidateModel } from './activity.candidate.model';

export class ActivityCreateModel {
  @IsString()
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(2)
  @Type(() => ActivityCandidateModel)
  candidates: ActivityCandidateModel[];

  startTime: Date;

  endTime: Date;

  @IsEmpty()
  status: boolean;
}
