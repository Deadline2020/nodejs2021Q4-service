const viewModel = {
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

const bodyModel = {
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

const getAllBoards = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: viewModel,
      },
    },
  },
};

const getBoard = {
  schema: {
    params: {
      boardId: { type: 'string' },
    },
    response: {
      200: viewModel,
    },
  },
};

const addBoard = {
  schema: {
    body: bodyModel,
    response: {
      201: viewModel,
    },
  },
};

const updateBoard = {
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

const removeBoard = {
  schema: {
    params: {
      boardId: { type: 'string' },
    },
  },
};

module.exports = { getAllBoards, getBoard, addBoard, updateBoard, removeBoard };
