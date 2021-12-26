import { FastifySchema } from "fastify";

export interface User {
  id?: string;
  name: string;
  login: string;
  password?: string;
}

interface UserModel {
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
    body?: UserModel;
    response?: {
      [key: number]: UserModel | { type: string; items: UserModel };
    };
  };
}

const viewModel: UserModel = {
  type: 'object',
  required: ['name'],
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    login: { type: 'string' },
  },
};

const bodyModel: UserModel = {
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
