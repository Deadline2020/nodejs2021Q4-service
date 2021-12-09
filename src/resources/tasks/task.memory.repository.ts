import { Task } from './task.model';

export const taskDB: Task[] = [];

export const getAllTasksByUser = (userId: string): Task[] =>
  taskDB.filter((task: Task): boolean => task.userId === userId);

export const getAllTasksByBoard = (boardId: string): Task[] =>
  taskDB.filter((task: Task): boolean => task.boardId === boardId);

export const getTask = (taskId: string): Task | undefined =>
  taskDB.find((task: Task): boolean => task.id === taskId);

export const addTask = (task: Task): number => taskDB.push(task);

export const updateTask = (task: Task, indexDB: number): void => {
  taskDB.splice(indexDB, 1, task);
};

export const removeTask = (indexDB: number): void => {
  taskDB.splice(indexDB, 1);
};

export const getIndexDB = (taskId: string): number =>
  taskDB.findIndex((task: Task): boolean => task.id === taskId);

export const getTaskByIndexDB = (indexDB: number) => taskDB[indexDB];
