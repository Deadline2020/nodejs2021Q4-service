import * as tasksRepo from './task.memory.repository';
import { Task } from './task.model';

/**
 * The function returns all task records from the database with the corresponding board ID
 *
 * @param boardId - board ID
 * @returns The array of task records
 */
export const getAllTasksByBoard = (boardId: string): Promise<Task[]> =>
  tasksRepo.getAllTasksByBoard(boardId);

/**
 * The function returns the task record with the corresponding user and board IDs
 *
 * @param taskId - task ID
 * @returns The task record if the record was found or `undefined` if not
 */
export const getTask = (taskId: string): Promise<Task | undefined> =>
  tasksRepo.getTask(taskId);

/**
 * The function of creating a task record in the database
 *
 * @param body - task data
 * @param boardId - board ID
 * @returns The new task record
 */
export const addTask = (body: Task, boardId: string): Promise<Task> =>
  tasksRepo.addTask(body, boardId);

/**
 * The function of updating the task record in the database
 *
 * @param body - task data
 * @param taskId - task ID
 * @returns The updated task record if the record was found or `undefined` if not
 */
export const updateTask = (
  body: Task,
  taskId: string
): Promise<Task | undefined> => tasksRepo.updateTask(body, taskId);

/**
 * The function of deleting the task record from the database
 *
 * @param taskId - task ID
 * @returns The value is `true` if the deletion was successful and `false` if not
 */
export const removeTask = (taskId: string): Promise<Task | undefined> =>
  tasksRepo.removeTask(taskId);
