import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class ActivityCandidateModel {
  @IsString()
  @ApiProperty({ type: String, description: '名字' })
  name: string;
}
