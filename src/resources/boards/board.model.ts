import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Col } from '../columns/column.model';
import { Task } from '../tasks/task.model';

@Entity()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 30 })
  title!: string;

  @OneToMany(() => Col, (column) => column.board)
  columns!: Col[];

  @OneToMany(() => Task, (task) => task.boardId)
  tasks!: Task[];
}
