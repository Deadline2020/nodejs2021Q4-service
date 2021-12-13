const { v4: uuid } = require('uuid');

const usersRepo = require('./user.memory.repository');
const tasksService = require('../tasks/task.service');

const getAllUsers = () => usersRepo.getAllUsers();

const getUser = (userId) => usersRepo.getUser(userId);

const addUser = (body) => {
  const user = { ...body };

  user.id = uuid();
  usersRepo.addUser(user);

  return user;
};

const updateUser = (body, userId) => {
  const indexDB = usersRepo.getIndexDB(userId);

  if (indexDB !== -1) {
    const user = { ...body };

    user.id = userId;
    usersRepo.updateUser(user, indexDB);

    return user;
  }

  return false;
};

const removeUser = (userId) => {
  const indexDB = usersRepo.getIndexDB(userId);

  if (indexDB !== -1) {
    const tasks = tasksService.getAllTasksByUser(userId);

    tasks.forEach((task) => {
      const newTask = { ...task };

      newTask.userId = null;
      tasksService.updateTask(newTask, newTask.boardId, newTask.id);
    });

    usersRepo.removeUser(indexDB);

    return true;
  }

  return false;
};

module.exports = { getAllUsers, getUser, addUser, updateUser, removeUser };
