const viewModel = {
  type: 'object',
  required: ['title', 'order', 'boardId', 'columnId'],
  properties: {
    id: { type: 'string' },
    order: { type: 'number' },
    title: { type: 'string' },
    description: { type: 'string' },
    userId: { type: 'string' },
    boardId: { type: 'string' },
    columnId: { type: 'string' },
  },
};

const bodyModel = {
  type: 'object',
  required: ['title', 'order', 'boardId', 'columnId'],
  properties: {
    order: { type: 'number' },
    title: { type: 'string' },
    description: { type: 'string' },
    userId: { type: 'string' },
    boardId: { type: 'string' },
    columnId: { type: 'string' },
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
