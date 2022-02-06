import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

import { Board } from '../boards/board.model';
import { Col } from '../columns/column.model';
import { User } from '../users/user.model';

export class TaskDto {
  @IsString()
  @IsUUID(4)
  @IsOptional()
  id?: string;

  @IsNumber()
  order!: number;

  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsString()
  @IsUUID(4)
  @IsOptional()
  userId?: string;

  @IsOptional()
  user?: User;

  @IsString()
  @IsUUID(4)
  @IsOptional()
  boardId?: string;

  @IsOptional()
  board?: Board;

  @IsString()
  @IsUUID(4)
  @IsOptional()
  columnId?: string;

  @IsOptional()
  column?: Col;
}
