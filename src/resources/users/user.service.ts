import { randomUUID } from 'crypto';

import * as usersRepo from './user.memory.repository';
import * as tasksService from '../tasks/task.service';
import { ITask, IUser } from '../../common/types';

/**
 * The function returns all user records from the database
 *
 * @returns The array of user records
 */
export const getAllUsers = (): IUser[] => usersRepo.getAllUsers();

/**
 * The function returns the user record with the corresponding ID
 *
 * @param userId - user ID
 * @returns The user record if the record was found or `undefined` if not
 */
export const getUser = (userId: string): IUser | undefined =>
  usersRepo.getUser(userId);

/**
 * The function of creating a user record in the database
 *
 * @param body - user data
 * @returns The new user record
 */
export const addUser = (body: IUser): IUser => {
  const user: IUser = { ...body };

  user.id = randomUUID();
  usersRepo.addUser(user);

  return user;
};

/**
 * The function of updating the user record in the database
 *
 * @param body - user data
 * @param userId - user ID
 * @returns The updated user record if the record was found or `undefined` if not
 */
export const updateUser = (body: IUser, userId: string): IUser | undefined => {
  const indexDB: number = usersRepo.getIndexDB(userId);

  if (indexDB !== -1) {
    const user: IUser = { ...body };

    user.id = userId;
    usersRepo.updateUser(user, indexDB);

    return user;
  }

  return undefined;
};

/**
 * The function of deleting the user record from the database
 *
 * @param userId - user ID
 * @returns The value is `true` if the deletion was successful and `false` if not
 */
export const removeUser = (userId: string): boolean => {
  const indexDB: number = usersRepo.getIndexDB(userId);

  if (indexDB !== -1) {
    const tasks: ITask[] = tasksService.getAllTasksByUser(userId);

    tasks.forEach((task: ITask) => {
      const newTask: ITask = { ...task };

      newTask.userId = null;
      tasksService.updateTask(newTask, newTask.boardId, newTask.id as string);
    });

    usersRepo.removeUser(indexDB);

    return true;
  }

  return false;
};
