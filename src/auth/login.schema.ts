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
  required: ['token'],
  properties: {
    token: { type: 'string' },
  },
};

const bodyModel: UserData = {
  type: 'object',
  required: ['login', 'password'],
  properties: {
    login: { type: 'string' },
    password: { type: 'string' },
  },
};

export const getToken: UserSchema = {
  schema: {
    body: bodyModel,
    response: {
      200: viewModel,
    },
  },
};
