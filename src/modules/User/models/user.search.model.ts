import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UserSearchModel {
  @IsOptional()
  @ApiProperty({ type: String, description: '邮箱' })
  email?: string;

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
