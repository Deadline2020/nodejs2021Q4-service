import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from 'fastify';

import * as usersService from './user.service';
import * as usersModel from './user.model';
import { User } from './user.model';

interface Params {
  userId: string;
}

interface Request extends FastifyRequest {
  body: User;
}

const getAllUsers = (_: FastifyRequest, reply: FastifyReply): void => {
  const allUsers: User[] = usersService.getAllUsers();

  reply.send(allUsers);
};

const getUser = (req: FastifyRequest, reply: FastifyReply): void => {
  const { userId } = req.params as Params;
  const user: User | undefined = usersService.getUser(userId);

  if (user) {
    reply.send(user);
  } else {
    reply.status(404).send({
      message: 'User not found',
    });
  }
};

const addUser = (req: FastifyRequest, reply: FastifyReply): void => {
  const { body } = req as Request;
  const user: User = usersService.addUser(body);

  reply.code(201).send(user);
};

const updateUser = (req: FastifyRequest, reply: FastifyReply): void => {
  const { userId } = req.params as Params;
  const { body } = req as Request;
  const user: User | undefined = usersService.updateUser(body, userId);

  if (user) {
    reply.send(user);
  } else {
    reply.status(404).send({
      message: 'User not found',
    });
  }
};

const removeUser = (req: FastifyRequest, reply: FastifyReply): void => {
  const { userId } = req.params as Params;

  if (usersService.removeUser(userId)) {
    reply.code(204).send();
  } else {
    reply.status(404).send({
      message: 'User not found',
    });
  }
};

function userRoutes(
  app: FastifyInstance,
  _: FastifyPluginOptions,
  done: () => void
): void {
  app.get('/users', usersModel.getAllUsers, getAllUsers);
  app.get('/users/:userId', usersModel.getUser, getUser);
  app.post('/users', usersModel.addUser, addUser);
  app.put('/users/:userId', usersModel.updateUser, updateUser);
  app.delete('/users/:userId', usersModel.removeUser, removeUser);

  done();
}

export default userRoutes;
