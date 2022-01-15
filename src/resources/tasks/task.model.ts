import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../users/user.model';
import { Board } from '../boards/board.model';
import { Col } from '../columns/column.model';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'smallint' })
  order!: number;

  @Column({ type: 'varchar', length: 30 })
  title!: string;

  @Column({ type: 'varchar', length: 100 })
  description!: string;

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn({ name: 'userId' })
  userId!: User;

  @ManyToOne(() => Board, (board) => board.tasks)
  @JoinColumn({ name: 'boardId' })
  boardId!: Board;

  @ManyToOne(() => Col, (column) => column.tasks)
  @JoinColumn({ name: 'columnId' })
  columnId!: Col;
}
