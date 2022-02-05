import { IsOptional, IsString, IsUUID } from 'class-validator';
import { Col } from '../columns/column.model';

export class BoardDto {
  @IsString()
  @IsUUID(4)
  @IsOptional()
  id?: string;

  @IsString()
  title!: string;

  @IsOptional()
  columns!: Col[];
}
