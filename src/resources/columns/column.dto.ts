import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

import { Board } from '../boards/board.model';

export class ColumnDto {
  @IsString()
  @IsUUID(4)
  @IsOptional()
  id?: string;

  @IsString()
  title!: string;

  @IsNumber()
  order!: number;

  @IsOptional()
  board!: Board;
}
