import { DeleteResult, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TaskDto } from './task.dto';
import { Task } from './task.model';
import { BoardService } from '../boards/board.service';
import { ColumnService } from '../columns/column.service';
import { UserService } from '../users/user.service';
import { Board } from '../boards/board.model';
import { User } from '../users/user.model';
import { Col } from '../columns/column.model';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepo: Repository<Task>,
    private readonly boardService: BoardService,
    private readonly columnService: ColumnService,
    private readonly userService: UserService
  ) {}

  async addTask(boardId: string, taskDto: TaskDto): Promise<Task> {
    const newTask: Task = this.taskRepo.create(taskDto);

    const board: Board | undefined = await this.boardService.getBoard(boardId);
    newTask.board = board || null;

    if (taskDto.userId) {
      const user: User | undefined = await this.userService.getUserById(
        taskDto.userId
      );
      newTask.user = user || null;
    }
    if (taskDto.columnId) {
      const column: Col | undefined = await this.columnService.getColumn(
        taskDto.columnId
      );
      newTask.column = column || null;
    }

    return await this.taskRepo.save(newTask);
  }

  async getAllTasksByBoard(boardId: string): Promise<Task[]> {
    return await this.taskRepo.find({ where: { boardId } });
  }

  async getTask(boardId: string, id: string): Promise<Task | undefined> {
    return await this.taskRepo.findOne({ where: { boardId, id } });
  }

  async updateTask(
    boardId: string,
    taskId: string,
    taskDto: TaskDto
  ): Promise<Task | undefined> {
    const task: Task | undefined = await this.getTask(boardId, taskId);

    if (task) {
      this.taskRepo.merge(task, taskDto);
      return await this.taskRepo.save(task);
    }

    return undefined;
  }

  async removeTask(
    boardId: string,
    taskId: string
  ): Promise<DeleteResult | null> {
    const task: Task | undefined = await this.getTask(boardId, taskId);

    if (task) {
      return await this.taskRepo.delete(taskId);
    }

    return null;
  }
}
