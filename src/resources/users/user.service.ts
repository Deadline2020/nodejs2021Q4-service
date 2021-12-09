import { v4 as uuid } from 'uuid';

import * as usersRepo from './user.memory.repository';
import * as tasksService from '../tasks/task.service';
import { User } from './user.model';
import { Task } from '../tasks/task.model';

export const getAllUsers = (): User[] => usersRepo.getAllUsers();

export const getUser = (userId: string): User | undefined =>
  usersRepo.getUser(userId);

export const addUser = (body: User): User => {
  const user: User = { ...body };

  user.id = uuid();
  usersRepo.addUser(user);

  return user;
};

export const updateUser = (body: User, userId: string): User | undefined => {
  const indexDB: number = usersRepo.getIndexDB(userId);

  if (indexDB !== -1) {
    const user: User = { ...body };

    user.id = userId;
    usersRepo.updateUser(user, indexDB);

    return user;
  }

  return undefined;
};

export const removeUser = (userId: string): boolean => {
  const indexDB: number = usersRepo.getIndexDB(userId);

  if (indexDB !== -1) {
    const tasks: Task[] = tasksService.getAllTasksByUser(userId);

    tasks.forEach((task: Task) => {
      const newTask: Task = { ...task };

      newTask.userId = null;
      tasksService.updateTask(newTask, newTask.boardId, newTask.id as string);
    });

    usersRepo.removeUser(indexDB);

    return true;
  }

  return false;
};
