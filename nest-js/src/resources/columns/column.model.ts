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

  @ManyToOne(() => Board, (board) => board.columns, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  board!: Board;

  @OneToMany(() => Task, (task) => task.boardId, {
    cascade: true,
  })
  tasks!: Task[];
}
