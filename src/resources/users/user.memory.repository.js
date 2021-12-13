const userDB = [];

const getAllUsers = () => userDB;

const getUser = (userId) => userDB.find((user) => user.id === userId);

const addUser = (user) => userDB.push(user);

const updateUser = (user, indexDB) => {
  userDB.splice(indexDB, 1, user);
};

const removeUser = (indexDB) => {
  userDB.splice(indexDB, 1);
};

const getIndexDB = (userId) => userDB.findIndex((user) => user.id === userId);

module.exports = {
  getAllUsers,
  getUser,
  addUser,
  updateUser,
  removeUser,
  getIndexDB,
};
