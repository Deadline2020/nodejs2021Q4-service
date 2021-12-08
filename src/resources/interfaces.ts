import fastify = require('fastify');

export interface User {
  id?: string;
  name: string;
  login: string;
  password?: string;
}

export interface UserModel {
  type: string;
  required?: string[];
  properties: {
    [key: string]: { type: string | string[] };
  };
}

export interface UserSchema extends fastify.FastifySchema {
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

export interface Task {
  id?: string;
  order: string;
  title: string;
  description: string;
  userId: string | null;
  boardId: string;
  columnId: string | null;
}

export interface Params {
  userId?: string;
}
// export = IUser;
