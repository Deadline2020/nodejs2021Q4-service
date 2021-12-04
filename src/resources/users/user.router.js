const usersService = require('./user.service');
const usersModel = require('./user.model');

const getAllUsers = (req, reply) => {
  const allUsers = usersService.getAllUsers();

  reply.send(allUsers);
};

const getUser = (req, reply) => {
  const { userId } = req.params;
  const user = usersService.getUser(userId);

  if (user) {
    reply.send(user);
  } else {
    reply.status(404).send({
      message: 'User not found',
    });
  }
};

const addUser = (req, reply) => {
  const { body } = req;

  const user = usersService.addUser(body);
  // console.log('user: ', user);
  reply.code(201).send(user);
};

const updateUser = (req, reply) => {
  const { userId } = req.params;
  const { body } = req;

  const user = usersService.updateUser(body, userId);

  if (user) {
    reply.send(user);
  } else {
    reply.status(404).send({
      message: 'User not found',
    });
  }
};

const removeUser = (req, reply) => {
  const { userId } = req.params;

  if (usersService.removeUser(userId)) {
    reply.code(204).send();
  } else {
    reply.status(404).send({
      message: 'User not found',
    });
  }
};

function userRoutes(app, options, done) {
  app.get('/users', usersModel.getAllUsers, getAllUsers);
  app.get('/users/:userId', usersModel.getUser, getUser);
  app.post('/users', usersModel.addUser, addUser);
  app.put('/users/:userId', usersModel.updateUser, updateUser);
  app.delete('/users/:userId', usersModel.removeUser, removeUser);

  done();
}

module.exports = userRoutes;
