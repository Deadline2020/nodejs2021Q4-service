import { User } from './user.model';

/**
 * The function returns all user records from the database
 *
 * @returns The array of user records
 */
export const getAllUsers = async (): Promise<User[]> => User.find();

/**
 * The function returns the user record with the corresponding ID
 *
 * @param userId - user ID
 * @returns The user record if the record was found or `undefined` if not
 */
export const getUserById = async (userId: string): Promise<User | undefined> =>
  User.findOne(userId);

  /**
 * The function returns the user record with the corresponding login
 *
 * @param login - user login
 * @returns The user record if the record was found or `undefined` if not
 */
export const getUserByLogin = async (login: string): Promise<User | undefined> =>
  User.findOne({where: {login}});

/**
 * The function of creating a user record in the database
 *
 * @param user - user data
 */
export const addUser = async (user: User): Promise<User> => {
  const newUser = new User();

  newUser.name = user.name;
  newUser.login = user.login;
  newUser.password = user.password;

  await newUser.save();

  return newUser;
};

/**
 * The function of updating the user record in the database
 *
 * @param user - user data
 * @param id - user id
 */
export const updateUser = async (
  userData: User,
  id: string
): Promise<User | undefined> => {
  const user = await getUserById(id);

  if (user) {
    User.merge(user, userData);
    await user.save();
    return user;
  }

  return undefined;
};

/**
 * The function of deleting the user record from the database
 *
 * @param id - user id
 */
export const removeUser = async (id: string): Promise<User | undefined> => {
  const user = await getUserById(id);

  if (user) {
    return User.remove(user);
  }

  return undefined;
};
