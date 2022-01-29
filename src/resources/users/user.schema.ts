import { FastifySchema } from 'fastify';

interface UserData {
  type: string;
  required?: string[];
  properties: {
    [key: string]: { type: string | string[] };
  };
}

interface UserSchema extends FastifySchema {
  schema: {
    params?: {
      userId: { type: string };
    };
    body?: UserData;
    response?: {
      [key: number]: UserData | { type: string; items: UserData };
    };
  };
}

const viewModel: UserData = {
  type: 'object',
  required: ['name'],
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    login: { type: 'string' },
  },
};

const bodyModel: UserData = {
  type: 'object',
  required: ['name'],
  properties: {
    name: { type: 'string' },
    login: { type: 'string' },
    password: { type: 'string' },
  },
};

export const getAllUsers: UserSchema = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: viewModel,
      },
    },
  },
};

export const getUser: UserSchema = {
  schema: {
    params: {
      userId: { type: 'string' },
    },
    response: {
      200: viewModel,
    },
  },
};

export const addUser: UserSchema = {
  schema: {
    body: bodyModel,
    response: {
      201: viewModel,
    },
  },
};

export const updateUser: UserSchema = {
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

export const removeUser: UserSchema = {
  schema: {
    params: {
      userId: { type: 'string' },
    },
  },
};
