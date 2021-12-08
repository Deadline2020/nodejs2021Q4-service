import I = require('../interfaces');

const userDB: I.User[] = [];

const getAllUsers = (): I.User[] => userDB;

const getUser = (userId: string): I.User | undefined =>
  userDB.find((user: I.User): boolean => user.id === userId);

const addUser = (user: I.User): number => userDB.push(user);

const updateUser = (user: I.User, indexDB: number): void => {
  userDB.splice(indexDB, 1, user);
};

const removeUser = (indexDB: number): void => {
  userDB.splice(indexDB, 1);
};

const getIndexDB = (userId:string): number => userDB.findIndex((user: I.User): boolean => user.id === userId);

export = {
  getAllUsers,
  getUser,
  addUser,
  updateUser,
  removeUser,
  getIndexDB,
};
