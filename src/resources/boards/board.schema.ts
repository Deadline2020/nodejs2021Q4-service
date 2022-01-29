import { FastifySchema } from 'fastify';

interface ColumnData {
  type: string;
  required?: string[];
  properties: {
    id?: { type: string | string[] };
    title: { type: string | string[] };
    order: { type: string | string[] };
  };
}

interface BoardData {
  type: string;
  required?: string[];
  properties: {
    id?: { type: string | string[] };
    title: { type: string | string[] };
    columns: {
      type: string;
      items: ColumnData;
    };
  };
}

interface BoardSchema extends FastifySchema {
  schema: {
    params?: {
      boardId: { type: string };
    };
    body?: BoardData;
    response?: {
      [key: number]: BoardData | { type: string; items: BoardData };
    };
  };
}

const viewModel: BoardData = {
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

const bodyModel: BoardData = {
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
