import * as usersRepo from './user.memory.repository';
import { User } from './user.model';

/**
 * The function returns all user records from the database
 *
 * @returns The array of user records
 */
export const getAllUsers = (): Promise<User[]> => usersRepo.getAllUsers();

/**
 * The function returns the user record with the corresponding ID
 *
 * @param userId - user ID
 * @returns The user record if the record was found or `undefined` if not
 */
export const getUser = (userId: string): Promise<User | undefined> =>
  usersRepo.getUserById(userId);

/**
 * The function of creating a user record in the database
 *
 * @param body - user data
 * @returns The new user record
 */
export const addUser = (body: User): Promise<User> => usersRepo.addUser(body);

/**
 * The function of updating the user record in the database
 *
 * @param body - user data
 * @param userId - user ID
 * @returns The updated user record if the record was found or `undefined` if not
 */
export const updateUser = (
  body: User,
  userId: string
): Promise<User | undefined> => usersRepo.updateUser(body, userId);

/**
 * The function of deleting the user record from the database
 *
 * @param userId - user ID
 * @returns The value is `true` if the deletion was successful and `false` if not
 */
export const removeUser = (userId: string): Promise<User | undefined> =>
  usersRepo.removeUser(userId);

/**
 * The function of creating the default admin record in the database
 *
 * @param login - admin login
 * @param password - admin password
 */
export const setDefaultAdmin = (
  login: string,
  password: string
): Promise<void> => usersRepo.setDefaultAdmin(login, password);
