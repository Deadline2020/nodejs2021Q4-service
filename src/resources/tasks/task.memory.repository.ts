import { Board } from '../boards/board.model';
import { Col } from '../columns/column.model';
import { User } from '../users/user.model';
import { Task } from './task.model';

/**
 * The function returns all task records with the corresponding board ID
 *
 * @param boardId - board ID
 * @returns The array of task records
 */
export const getAllTasksByBoard = (boardId: string): Promise<Task[]> =>
  Task.find({ where: { boardId } });

/**
 * The function returns the task record with the corresponding ID
 *
 * @param taskId - task ID
 * @returns The task record if the record was found or `undefined` if not
 */
export const getTask = async (taskId: string): Promise<Task | undefined> =>
  Task.findOne(taskId);

/**
 * The function of creating a task record in the database
 *
 * @param task - task data
 */
export const addTask = async (task: Task, boardId: string): Promise<Task> => {
  const newTask = new Task();

  newTask.order = task.order;
  newTask.title = task.title;
  newTask.description = task.description;

  const board = await Board.findOne(boardId);
  newTask.board = board || null;

  if (task.userId) {
    const user = await User.findOne(task.userId);
    newTask.user = user || null;
  }
  if (task.columnId) {
    const column = await Col.findOne(task.columnId);
    newTask.column = column || null;
  }

  await newTask.save();

  return newTask;
};

/**
 * The function of updating the task record in the database
 *
 * @param task - task data
 * @param id - task id
 */
export const updateTask = async (
  taskData: Task,
  id: string
): Promise<Task | undefined> => {
  const task = await getTask(id);

  if (task) {
    Task.merge(task, taskData);
    await task.save();
    return task;
  }

  return undefined;
};

/**
 * The function of deleting the task record from the database
 *
 * @param id - task id
 */
export const removeTask = async (id: string): Promise<Task | undefined> => {
  const task = await getTask(id);

  if (task) {
    return Task.remove(task);
  }

  return undefined;
};
