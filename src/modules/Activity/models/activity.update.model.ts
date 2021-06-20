import { IsString, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ActivityStatus } from '../../../core/enum';
export class ActivityUpdateModel {
  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: '名字' })
  name?: string;

  @IsEnum(ActivityStatus)
  @IsOptional()
  @ApiProperty({
    enum: ['UNSTART', 'PROCESSING', 'ENDED'],
    description:
      '活动状态,  UNSTART = -1  未开始,PROCESSING = 1 进行中, ENDED = 10 已结束',
  })
  status: ActivityStatus;
}
