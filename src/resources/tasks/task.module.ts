import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { Task } from './task.model';
import { BoardModule } from '../boards/board.module';
import { ColumnModule } from '../columns/column.module';
import { UserModule } from '../users/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    BoardModule,
    ColumnModule,
    UserModule,
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
