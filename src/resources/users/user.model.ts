import I = require('../interfaces');

const viewModel: I.UserModel = {
  type: 'object',
  required: ['name'],
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    login: { type: 'string' },
  },
};

const bodyModel: I.UserModel = {
  type: 'object',
  required: ['name'],
  properties: {
    name: { type: 'string' },
    login: { type: 'string' },
    password: { type: 'string' },
  },
};

const getAllUsersSchema: I.UserSchema = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: viewModel,
      },
    },
  },
};

const getUserSchema: I.UserSchema = {
  schema: {
    params: {
      userId: { type: 'string' },
    },
    response: {
      200: viewModel,
    },
  },
};

const addUserSchema: I.UserSchema = {
  schema: {
    body: bodyModel,
    response: {
      201: viewModel,
    },
  },
};

const updateUserSchema: I.UserSchema = {
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

const removeUserSchema: I.UserSchema = {
  schema: {
    params: {
      userId: { type: 'string' },
    },
  },
};

export = {
  getAllUsersSchema,
  getUserSchema,
  addUserSchema,
  updateUserSchema,
  removeUserSchema,
};
