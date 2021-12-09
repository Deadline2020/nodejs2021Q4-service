import { FastifySchema } from 'fastify';

export interface Column {
  id?: string;
  title: string;
  order: number;
}

export interface Board {
  id?: string;
  title: string;
  order: string;
  columns?: Column[];
}

interface ColumnModel {
  type: string;
  required?: string[];
  properties: {
    id?: { type: string | string[] };
    title: { type: string | string[] };
    order: { type: string | string[] };
  };
}

interface BoardModel {
  type: string;
  required?: string[];
  properties: {
    id?: { type: string | string[] };
    title: { type: string | string[] };
    columns: {
      type: string;
      items: ColumnModel;
    };
  };
}

interface BoardSchema extends FastifySchema {
  schema: {
    params?: {
      boardId: { type: string };
    };
    body?: BoardModel;
    response?: {
      [key: number]: BoardModel | { type: string; items: BoardModel };
    };
  };
}

const viewModel: BoardModel = {
  type: 'object',
  required: ['title', 'columns'],
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    columns: {
      type: 'array',
      items: {
        type: 'object',
        required: ['title', 'order'],
        properties: {
          id: { type: 'string' },
          title: { type: 'string' },
          order: { type: 'number' },
        },
      },
    },
  },
};

const bodyModel: BoardModel = {
  type: 'object',
  required: ['title', 'columns'],
  properties: {
    title: { type: 'string' },
    columns: {
      type: 'array',
      items: {
        type: 'object',
        required: ['title', 'order'],
        properties: {
          title: { type: 'string' },
          order: { type: 'number' },
        },
      },
    },
  },
};

export const getAllBoards: BoardSchema = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: viewModel,
      },
    },
  },
};

export const getBoard: BoardSchema = {
  schema: {
    params: {
      boardId: { type: 'string' },
    },
    response: {
      200: viewModel,
    },
  },
};

export const addBoard: BoardSchema = {
  schema: {
    body: bodyModel,
    response: {
      201: viewModel,
    },
  },
};

export const updateBoard: BoardSchema = {
  schema: {
    params: {
      boardId: { type: 'string' },
    },
    body: bodyModel,
    response: {
      200: viewModel,
    },
  },
};

export const removeBoard: BoardSchema = {
  schema: {
    params: {
      boardId: { type: 'string' },
    },
  },
};
