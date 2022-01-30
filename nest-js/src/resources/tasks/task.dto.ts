import { Board } from '../boards/board.model';
import { Col } from '../columns/column.model';
import { User } from '../users/user.model';

export class TaskDto {
  id?: string;

  order!: number;

  title!: string;

  description!: string;

  userId?: string;

  user?: User;

  boardId?: string;

  board?: Board;

  columnId?: string;

  column?: Col;
}
