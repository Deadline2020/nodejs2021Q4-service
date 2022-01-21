import jwt from 'jsonwebtoken';

import * as usersRepo from '../resources/users/user.memory.repository';
import { User } from '../resources/users/user.model';
import config from '../common/config';

/**
 * The function requests the user record with the corresponding login and password, and then generate token and return it if the user record was found, or send emp message if not
 *
 * @param login - user login
 * @param password - user password
 * @returns The generated token if the user record was found or `undefined` if not.
 */
export const getToken = async (
  login: string,
  password: string
): Promise<string | undefined> => {
  const user: User | undefined = await usersRepo.getUserByLogin(login);
  let token: string | undefined;

  if (user) {
    const isCorrectPassword = user.password === password;

    if (isCorrectPassword) {
      const payload = { userId: user.id, login: user.login };
      token = jwt.sign(payload, config.JWT_SECRET_KEY);
    }
  }

  return token;
};
