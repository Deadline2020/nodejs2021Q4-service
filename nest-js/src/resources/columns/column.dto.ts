import { Board } from '../boards/board.model';

export class ColumnDto {
  id?: string;

  title!: string;

  order!: number;

  board!: Board;
}
