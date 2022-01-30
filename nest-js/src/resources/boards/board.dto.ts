import { Col } from '../columns/column.model';

export class BoardDto {
  id?: string;

  title!: string;

  columns!: Col[];
}
