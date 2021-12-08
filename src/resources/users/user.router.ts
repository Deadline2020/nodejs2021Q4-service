import fastify = require('fastify');
import usersService = require('./user.service');
import usersModel = require('./user.model');
import I = require('../interfaces');

const getAllUsers = (
  _: fastify.FastifyRequest,
  reply: fastify.FastifyReply
): void => {
  const allUsers: I.User[] = usersService.getAllUsers();

  reply.send(allUsers);
};

const getUser = (
  req: fastify.FastifyRequest,
  reply: fastify.FastifyReply
): void => {
  const { userId } = req.params as I.Params;
  const user: I.User | undefined = usersService.getUser(userId as string);

  if (user) {
    reply.send(user);
  } else {
    reply.status(404).send({
      message: 'User not found',
    });
  }
};

const addUser = (
  req: fastify.FastifyRequest,
  reply: fastify.FastifyReply
): void => {
  const { body } = req;
  const user: I.User = usersService.addUser(body as I.User);

  reply.code(201).send(user);
};

const updateUser = (
  req: fastify.FastifyRequest,
  reply: fastify.FastifyReply
): void => {
  const { userId } = req.params as I.Params;
  const { body } = req;
  const user: I.User | undefined = usersService.updateUser(
    body as I.User,
    userId as string
  );

  if (user) {
    reply.send(user);
  } else {
    reply.status(404).send({
      message: 'User not found',
    });
  }
};

const removeUser = (
  req: fastify.FastifyRequest,
  reply: fastify.FastifyReply
): void => {
  const { userId } = req.params as I.Params;

  if (usersService.removeUser(userId as string)) {
    reply.code(204).send();
  } else {
    reply.status(404).send({
      message: 'User not found',
    });
  }
};

function userRoutes(
  app: fastify.FastifyInstance,
  _: fastify.FastifyPluginOptions,
  done: () => void
): void {
  app.get('/users', usersModel.getAllUsersSchema, getAllUsers);
  app.get('/users/:userId', usersModel.getUserSchema, getUser);
  app.post('/users', usersModel.addUserSchema, addUser);
  app.put('/users/:userId', usersModel.updateUserSchema, updateUser);
  app.delete('/users/:userId', usersModel.removeUserSchema, removeUser);

  done();
}

export = userRoutes;
