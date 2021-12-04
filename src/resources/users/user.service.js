const { v4: uuid } = require('uuid');

const usersRepo = require('./user.memory.repository');
const tasksService = require('../tasks/task.service');

const getAllUsers = () => usersRepo.getAllUsers();

const getUser = (id) => usersRepo.getUser(id);

const addUser = (body) => {
  const user = { ...body };
  user.id = uuid();
  usersRepo.addUser(user);
  return user;
};

const updateUser = (body, id) => {
  const indexDB = usersRepo.getIndexDB(id);

  if (indexDB !== -1) {
    const user = { ...body };
    user.id = id;
    usersRepo.updateUser(user, indexDB);
    return user;
  }
  return false;
};

const removeUser = (id) => {
  const indexDB = usersRepo.getIndexDB(id);
  // console.log('!!!!!!!!!!!!!indexDB Usera: ', indexDB);

  if (indexDB !== -1) {
    const tasks = tasksService.getAllTasksByUser(id);
    // console.log('Массив всех tasks: ', tasks);
    tasks.forEach((task) => {
      // if (task.userId === id) {
      // console.log('Нужная task: ', task);

      const newTask = { ...task };
      newTask.userId = null;
      tasksService.updateTask(newTask, newTask.boardId, newTask.id);
      // }
    });
    // console.log(
    //   '&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&'
    // );
    usersRepo.removeUser(indexDB);
    // console.log('???????????????????????????');
    return true;
  }
  return false;
};

module.exports = { getAllUsers, getUser, addUser, updateUser, removeUser };
