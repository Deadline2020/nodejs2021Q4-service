import { User } from './user.model';

export const userDB: User[] = [];

export const getAllUsers = (): User[] => userDB;

export const getUser = (userId: string): User | undefined =>
  userDB.find((user: User): boolean => user.id === userId);

export const addUser = (user: User): number => userDB.push(user);

export const updateUser = (user: User, indexDB: number): void => {
  userDB.splice(indexDB, 1, user);
};

export const removeUser = (indexDB: number): void => {
  userDB.splice(indexDB, 1);
};

export const getIndexDB = (userId: string): number =>
  userDB.findIndex((user: User): boolean => user.id === userId);
