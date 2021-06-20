import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class ActivitySearchModel {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @ApiProperty({ type: String, description: '第几页' })
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @ApiProperty({ type: Number, description: '每页数量' })
  limit?: number;
}
