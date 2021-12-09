import { v4 as uuid } from 'uuid';

import * as tasksRepo from './task.memory.repository';
import { Task } from './task.model';

export const getAllTasksByUser = (userId: string): Task[] =>
  tasksRepo.getAllTasksByUser(userId);

export const getAllTasksByBoard = (boardId: string): Task[] =>
  tasksRepo.getAllTasksByBoard(boardId);

export const getTask = (boardId: string, taskId: string): Task | undefined => {
  const task: Task | undefined = tasksRepo.getTask(taskId);

  return task?.boardId === boardId ? task : undefined;
};

export const addTask = (body: Task, boardId: string): Task => {
  const task: Task = { ...body };

  task.id = uuid();
  task.boardId = boardId;
  tasksRepo.addTask(task);

  return task;
};

export const updateTask = (
  body: Task,
  boardId: string,
  taskId: string
): Task | undefined => {
  const indexDB: number = tasksRepo.getIndexDB(taskId);

  if (indexDB !== -1) {
    let task: Task = tasksRepo.getTaskByIndexDB(indexDB);

    if (task.boardId === boardId) {
      const newData: Task = { ...body };

      task = { ...task, ...newData };
      tasksRepo.updateTask(task, indexDB);

      return task;
    }
  }

  return undefined;
};

export const removeTask = (boardId: string, taskId: string): boolean => {
  const indexDB: number = tasksRepo.getIndexDB(taskId);

  if (indexDB !== -1) {
    const task: Task = tasksRepo.getTaskByIndexDB(indexDB);

    if (task.boardId === boardId) {
      tasksRepo.removeTask(indexDB);

      return true;
    }
  }

  return false;
};
