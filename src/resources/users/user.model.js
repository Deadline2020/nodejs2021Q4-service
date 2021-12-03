const viewModel = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    login: { type: 'string' },
  },
};

const bodyModel = {
  type: 'object',
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
      id: { type: 'string' },
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
      id: { type: 'string' },
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
      id: { type: 'string' },
    },
  },
};

module.exports = { getAllUsers, getUser, addUser, updateUser, removeUser };
