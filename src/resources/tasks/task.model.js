const viewModel = {
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

const bodyModel = {
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

const getAllTasks = {
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

const getTask = {
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

const addTask = {
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

const updateTask = {
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

const removeTask = {
  schema: {
    params: {
      boardId: { type: 'string' },
      taskId: { type: 'string' },
    },
  },
};

module.exports = { getAllTasks, getTask, addTask, updateTask, removeTask };
