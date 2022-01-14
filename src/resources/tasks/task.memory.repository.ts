import { Task } from '../../common/types';

const taskDB: Task[] = [];

/**
 * The function returns all task records with the corresponding user ID
 *
 * @param userId - user ID
 * @returns The array of task records
 */
export const getAllTasksByUser = (userId: string): Task[] =>
  taskDB.filter((task: Task): boolean => task.userId === userId);

/**
 * The function returns all task records with the corresponding board ID
 *
 * @param boardId - board ID
 * @returns The array of task records
 */
export const getAllTasksByBoard = (boardId: string): Task[] =>
  taskDB.filter((task: Task): boolean => task.boardId === boardId);

/**
 * The function returns the task record with the corresponding ID
 *
 * @param taskId - task ID
 * @returns The task record if the record was found or `undefined` if not
 */
export const getTask = (taskId: string): Task | undefined =>
  taskDB.find((task: Task): boolean => task.id === taskId);

/**
 * The function of creating a task record in the database
 *
 * @param task - task data
 */
export const addTask = (task: Task) => {
  taskDB.push(task);
};

/**
 * The function of updating the task record in the database
 *
 * @param task - task data
 * @param indexDB - index of task record in database
 */
export const updateTask = (task: Task, indexDB: number): void => {
  taskDB.splice(indexDB, 1, task);
};

/**
 * The function of deleting the task record from the database
 *
 * @param indexDB - index of task record in database
 */
export const removeTask = (indexDB: number): void => {
  taskDB.splice(indexDB, 1);
};

/**
 * The function returns the index of task record in database
 *
 * @param taskId - task ID
 * @returns The index of task record in database if the record was found or `-1` if not
 */
export const getIndexDB = (taskId: string): number =>
  taskDB.findIndex((task: Task): boolean => task.id === taskId);

/**
 * The function returns the task record with the corresponding index in database
 *
 * @param indexDB - index of task record in database
 * @returns The task record
 */
export const getTaskByIndexDB = (indexDB: number) => taskDB[indexDB];
