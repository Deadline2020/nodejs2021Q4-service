import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Board } from '../boards/board.model';
import { Task } from '../tasks/task.model';

@Entity()
export class Col extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 30 })
  title!: string;

  @Column({ type: 'smallint' })
  order!: number;

  @ManyToOne(() => Board, (board) => board.columns)
  board!: Board;

  @OneToMany(() => Task, (task) => task.boardId)
  tasks!: Task[];
}
