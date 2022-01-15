import { randomUUID } from 'crypto';

import * as tasksRepo from './task.memory.repository';
import { ITask } from '../../common/types';

/**
 * The function returns all task records from the database with the corresponding user ID
 *
 * @param userId - user ID
 * @returns The array of task records
 */
export const getAllTasksByUser = (userId: string): ITask[] =>
  tasksRepo.getAllTasksByUser(userId);

/**
 * The function returns all task records from the database with the corresponding board ID
 *
 * @param boardId - board ID
 * @returns The array of task records
 */
export const getAllTasksByBoard = (boardId: string): ITask[] =>
  tasksRepo.getAllTasksByBoard(boardId);

/**
 * The function returns the task record with the corresponding user and board IDs
 *
 * @param boardId - board ID
 * @param taskId - task ID
 * @returns The task record if the record was found or `undefined` if not
 */
export const getTask = (boardId: string, taskId: string): ITask | undefined => {
  const task: ITask | undefined = tasksRepo.getTask(taskId);

  return task?.boardId === boardId ? task : undefined;
};

/**
 * The function of creating a task record in the database
 *
 * @param body - task data
 * @param boardId - board ID
 * @returns The new task record
 */
export const addTask = (body: ITask, boardId: string): ITask => {
  const task: ITask = { ...body };

  task.id = randomUUID();
  task.boardId = boardId;
  tasksRepo.addTask(task);

  return task;
};

/**
 * The function of updating the task record in the database
 *
 * @param body - task data
 * @param boardId - board ID
 * @param taskId - task ID
 * @returns The updated task record if the record was found or `undefined` if not
 */
export const updateTask = (
  body: ITask,
  boardId: string,
  taskId: string
): ITask | undefined => {
  const indexDB: number = tasksRepo.getIndexDB(taskId);

  if (indexDB !== -1) {
    let task: ITask = tasksRepo.getTaskByIndexDB(indexDB);

    if (task.boardId === boardId) {
      const newData: ITask = { ...body };

      task = { ...task, ...newData };
      tasksRepo.updateTask(task, indexDB);

      return task;
    }
  }

  return undefined;
};

/**
 * The function of deleting the task record from the database
 *
 * @param boardId - board ID
 * @param taskId - task ID
 * @returns The value is `true` if the deletion was successful and `false` if not
 */
export const removeTask = (boardId: string, taskId: string): boolean => {
  const indexDB: number = tasksRepo.getIndexDB(taskId);

  if (indexDB !== -1) {
    const task: ITask = tasksRepo.getTaskByIndexDB(indexDB);

    if (task.boardId === boardId) {
      tasksRepo.removeTask(indexDB);

      return true;
    }
  }

  return false;
};
