const { v4: uuid } = require('uuid');

const usersRepo = require('./user.memory.repository');

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

  if (indexDB !== -1) {
    usersRepo.removeUser(indexDB);
    return true;
  }
  return false;
};

module.exports = { getAllUsers, getUser, addUser, updateUser, removeUser };
