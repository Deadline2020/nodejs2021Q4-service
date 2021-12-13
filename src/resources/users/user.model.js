const viewModel = {
  type: 'object',
  required: ['name'],
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    login: { type: 'string' },
  },
};

const bodyModel = {
  type: 'object',
  required: ['name'],
  properties: {
    name: { type: 'string' },
    login: { type: 'string' },
    password: { type: 'string' },
  },
};

const getAllUsers = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: viewModel,
      },
    },
  },
};

const getUser = {
  schema: {
    params: {
      userId: { type: 'string' },
    },
    response: {
      200: viewModel,
    },
  },
};

const addUser = {
  schema: {
    body: bodyModel,
    response: {
      201: viewModel,
    },
  },
};

const updateUser = {
  schema: {
    params: {
      userId: { type: 'string' },
    },
    body: bodyModel,
    response: {
      200: viewModel,
    },
  },
};

const removeUser = {
  schema: {
    params: {
      userId: { type: 'string' },
    },
  },
};

module.exports = { getAllUsers, getUser, addUser, updateUser, removeUser };
