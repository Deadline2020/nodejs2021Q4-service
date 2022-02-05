import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  NotFoundException,
  HttpCode,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';

import { TaskService } from './task.service';
import { TaskDto } from './task.dto';
import { Task } from './task.model';
import STATUS_CODES from 'src/common/status-code';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('boards/:boardId/tasks')
@UseGuards(AuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async addTask(
    @Param('boardId') boardId: string,
    @Body() taskDto: TaskDto
  ): Promise<Task> {
    return await this.taskService.addTask(boardId, taskDto);
  }

  @Get()
  async getAllTasksByBoard(@Param('boardId') boardId: string): Promise<Task[]> {
    return await this.taskService.getAllTasksByBoard(boardId);
  }

  @Get(':taskId')
  async getTask(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string
  ): Promise<Task> {
    const task: Task | undefined = await this.taskService.getTask(
      boardId,
      taskId
    );

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  @Put(':taskId')
  async updateTask(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string,
    @Body() taskDto: TaskDto
  ): Promise<Task> {
    const task: Task | undefined = await this.taskService.updateTask(
      boardId,
      taskId,
      taskDto
    );

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  @Delete(':taskId')
  @HttpCode(STATUS_CODES.NO_CONTENT)
  async removeTask(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string
  ) {
    const deleteResult: DeleteResult | null = await this.taskService.removeTask(
      boardId,
      taskId
    );

    if (!deleteResult?.affected) {
      throw new NotFoundException('Task not found');
    }

    return;
  }
}
