import { FastifySchema } from 'fastify';

export interface Task {
  id?: string;
  order: string;
  title: string;
  description: string;
  userId: string | null;
  boardId: string;
  columnId: string | null;
}

interface TaskModel {
  type: string;
  required?: string[];
  properties: {
    [key: string]: { type: string | string[] };
  };
}

interface UserSchema extends FastifySchema {
  schema: {
    params?: {
      boardId: { type: string };
      taskId?: { type: string };
    };
    body?: TaskModel;
    response?: {
      [key: number]: TaskModel | { type: string; items: TaskModel };
    };
  };
}

const viewModel: TaskModel = {
  type: 'object',
  required: ['title', 'order', 'boardId'],
  properties: {
    id: { type: 'string' },
    order: { type: 'number' },
    title: { type: 'string' },
    description: { type: 'string' },
    userId: { type: ['string', 'null'] },
    boardId: { type: 'string' },
    columnId: { type: ['string', 'null'] },
  },
};

const bodyModel: TaskModel = {
  type: 'object',
  required: ['title', 'order', 'boardId'],
  properties: {
    order: { type: 'number' },
    title: { type: 'string' },
    description: { type: 'string' },
    userId: { type: ['string', 'null'] },
    boardId: { type: 'string' },
    columnId: { type: ['string', 'null'] },
  },
};

export const getAllTasks: UserSchema = {
  schema: {
    params: {
      boardId: { type: 'string' },
    },
    response: {
      200: {
        type: 'array',
        items: viewModel,
      },
    },
  },
};

export const getTask: UserSchema = {
  schema: {
    params: {
      boardId: { type: 'string' },
      taskId: { type: 'string' },
    },
    response: {
      200: viewModel,
    },
  },
};

export const addTask: UserSchema = {
  schema: {
    params: {
      boardId: { type: 'string' },
    },
    body: bodyModel,
    response: {
      201: viewModel,
    },
  },
};

export const updateTask: UserSchema = {
  schema: {
    params: {
      boardId: { type: 'string' },
      taskId: { type: 'string' },
    },
    body: bodyModel,
    response: {
      200: viewModel,
    },
  },
};

export const removeTask: UserSchema = {
  schema: {
    params: {
      boardId: { type: 'string' },
      taskId: { type: 'string' },
    },
  },
};
