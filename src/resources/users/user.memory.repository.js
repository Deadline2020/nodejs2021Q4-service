const userDB = [];

const getAllUsers = () => userDB;
const getUser = (id) => userDB.find((user) => user.id === id);
const addUser = (user) => userDB.push(user);
const updateUser = (user, indexDB) => {
  userDB.splice(indexDB, 1, user);
};
const removeUser = (indexDB) => {
  userDB.splice(indexDB, 1);
};
const getIndexDB = (id) => userDB.findIndex((user) => user.id === id);

module.exports = {
  getAllUsers,
  getUser,
  addUser,
  updateUser,
  removeUser,
  getIndexDB,
};
