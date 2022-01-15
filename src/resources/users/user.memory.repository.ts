import { IUser } from '../../common/types';

const userDB: IUser[] = [];

/**
 * The function returns all user records from the database
 *
 * @returns The array of user records
 */
export const getAllUsers = (): IUser[] => userDB;

/**
 * The function returns the user record with the corresponding ID
 *
 * @param userId - user ID
 * @returns The user record if the record was found or `undefined` if not
 */
export const getUser = (userId: string): IUser | undefined =>
  userDB.find((user: IUser): boolean => user.id === userId);

/**
 * The function of creating a user record in the database
 *
 * @param user - user data
 */
export const addUser = (user: IUser): void => {
  userDB.push(user);
};

/**
 * The function of updating the user record in the database
 *
 * @param user - user data
 * @param indexDB - index of user record in database
 */
export const updateUser = (user: IUser, indexDB: number): void => {
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
  userDB.findIndex((user: IUser): boolean => user.id === userId);
