import {
  BaseEntity,
  Column,
  Entity,
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

  @Column({ nullable: true })
  userId!: string | null;

  @ManyToOne(() => User, (user) => user.tasks, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  user!: User | null;

  @Column({ nullable: true })
  boardId!: string | null;

  @ManyToOne(() => Board, (board) => board.tasks, {
    onDelete: 'CASCADE',
  })
  board!: Board | null;

  @Column({ nullable: true })
  columnId!: string | null;

  @ManyToOne(() => Col, (column) => column.tasks, {
    nullable: true,
  })
  column!: Col | null;
}
