const viewModel = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    columns: {
      type: 'array',
      items: {
        type: 'object',
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
  properties: {
    title: { type: 'string' },
    columns: {
      type: 'array',
      items: {
        type: 'object',
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
      id: { type: 'string' },
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
      id: { type: 'string' },
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
      id: { type: 'string' },
    },
  },
};

module.exports = { getAllBoards, getBoard, addBoard, updateBoard, removeBoard };
