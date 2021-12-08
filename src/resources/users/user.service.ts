import uuid = require('uuid');
import usersRepo = require('./user.memory.repository');
import tasksService = require('../tasks/task.service');
import I = require('../interfaces');

const getAllUsers = (): I.User[] => usersRepo.getAllUsers();

const getUser = (userId: string): I.User | undefined =>
  usersRepo.getUser(userId);

const addUser = (body: I.User) => {
  const user: I.User = { ...body };

  user.id = uuid.v4();
  usersRepo.addUser(user);

  return user;
};

const updateUser = (body: I.User, userId: string): I.User | undefined => {
  const indexDB = usersRepo.getIndexDB(userId);

  if (indexDB !== -1) {
    const user: I.User = { ...body };

    user.id = userId;
    usersRepo.updateUser(user, indexDB);

    return user;
  }

  return undefined;
};

const removeUser = (userId: string): boolean => {
  const indexDB: number = usersRepo.getIndexDB(userId);

  if (indexDB !== -1) {
    const tasks: I.Task[] = tasksService.getAllTasksByUser(userId);

    tasks.forEach((task: I.Task) => {
      const newTask: I.Task = { ...task };

      newTask.userId = null;
      tasksService.updateTask(newTask, newTask.boardId, newTask.id);
    });

    usersRepo.removeUser(indexDB);

    return true;
  }

  return false;
};

export = { getAllUsers, getUser, addUser, updateUser, removeUser };
