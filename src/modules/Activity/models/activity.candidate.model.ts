import { IsString } from 'class-validator';

export class ActivityCandidateModel {
  @IsString()
  name: string;
}
