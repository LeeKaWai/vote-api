import { IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class ActivitySearchModel {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number;
}
