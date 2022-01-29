import { Exclude } from 'class-transformer';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Task } from '../tasks/task.model';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 30 })
  name!: string;

  @Column({ type: 'varchar', length: 20 })
  login!: string;

  @Column({ type: 'varchar', length: 100 })
  @Exclude({ toPlainOnly: true })
  password!: string;

  @OneToMany(() => Task, (task) => task.userId)
  tasks!: Task[];
}
