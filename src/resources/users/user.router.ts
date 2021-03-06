import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from 'fastify';

import * as usersService from './user.service';
import * as usersSchema from './user.schema';
import { IUser } from '../../common/types';
import { User } from './user.model';

interface Params {
  userId: string;
}

interface Request extends FastifyRequest {
  body: IUser;
}

/**
 * The route handler function. Requests the all user records from the database, and then sends them as a server response.
 *
 * @param _ - http request object (not used)
 * @param reply - http reply object
 */
const getAllUsers = async (
  _: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const allUsers: User[] = await usersService.getAllUsers();

  reply.send(allUsers);
};

/**
 * The route handler function. Requests the user record with the corresponding ID, and then sends it as a server response if the record was found, or send a `User not found` message if not.
 *
 * @param req - http request object
 * @param reply - http reply object
 */
const getUser = async (
  req: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const { userId } = req.params as Params;
  const user: User | undefined = await usersService.getUser(userId);

  if (user) {
    reply.send(user);
  } else {
    reply.status(404).send({
      message: 'User not found',
    });
  }
};

/**
 * The route handler function. Sends a request to create the user record, and then sends new user record as a server response.
 *
 * @param req - http request object
 * @param reply - http reply object
 */
const addUser = async (
  req: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const { body } = req as Request;
  const user: User = await usersService.addUser(body as User);

  reply.code(201).send(user);
};

/**
 * The route handler function. Sends a request to update the user record with the corresponding ID, and then sends updated user record as a server response if the record was found, or send a `User not found` message if not.
 *
 * @param req - http request object
 * @param reply - http reply object
 */
const updateUser = async (
  req: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const { userId } = req.params as Params;
  const { body } = req as Request;
  const user: User | undefined = await usersService.updateUser(
    body as User,
    userId
  );

  if (user) {
    reply.send(user);
  } else {
    reply.status(404).send({
      message: 'User not found',
    });
  }
};

/**
 * The route handler function. Sends a request to delete the user record with the corresponding ID, and then sends status code 204 if the record was deleted, or send a `User not found` message if not.
 *
 * @param req - http request object
 * @param reply - http reply object
 */
const removeUser = async (
  req: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const { userId } = req.params as Params;

  if (await usersService.removeUser(userId)) {
    reply.code(204).send();
  } else {
    reply.status(404).send({
      message: 'User not found',
    });
  }
};

/**
 * The function provide set of routes. To activate routes, use the `fastify.register()` method.

 * @param app - instance of fastify server
 * @param _ - set of options (not used)
 * @param done -  callback function
 */
function userRoutes(
  app: FastifyInstance,
  _: FastifyPluginOptions,
  done: () => void
): void {
  app.get('/users', usersSchema.getAllUsers, getAllUsers);
  app.get('/users/:userId', usersSchema.getUser, getUser);
  app.post('/users', usersSchema.addUser, addUser);
  app.put('/users/:userId', usersSchema.updateUser, updateUser);
  app.delete('/users/:userId', usersSchema.removeUser, removeUser);

  done();
}

export default userRoutes;
