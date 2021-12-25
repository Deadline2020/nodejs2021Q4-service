import { User } from './user.model';

const userDB: User[] = [];

/**
 * The function returns all user records from the database
 *
 * @returns The array of user records
 */
export const getAllUsers = (): User[] => userDB;

/**
 * The function returns the user record with the corresponding ID
 *
 * @param userId - user ID
 * @returns The user record if the record was found or `undefined` if not
 */
export const getUser = (userId: string): User | undefined =>
  userDB.find((user: User): boolean => user.id === userId);

/**
 * The function of creating a user record in the database
 *
 * @param user - user data
 */
export const addUser = (user: User): void => {
  userDB.push(user);
};

/**
 * The function of updating the user record in the database
 *
 * @param user - user data
 * @param indexDB - index of user record in database
 */
export const updateUser = (user: User, indexDB: number): void => {
  userDB.splice(indexDB, 1, user);
};

/**
 * The function of deleting the user record from the database
 *
 * @param indexDB - index of user record in database
 */
export const removeUser = (indexDB: number): void => {
  userDB.splice(indexDB, 1);
};

/**
 * The function returns the index of user record in database
 *
 * @param userId - user ID
 * @returns The index of user record in database if the record was found or `-1` if not
 */
export const getIndexDB = (userId: string): number =>
  userDB.findIndex((user: User): boolean => user.id === userId);