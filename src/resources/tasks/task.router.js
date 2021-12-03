const tasksService = require('./task.service');
const tasksModel = require('./task.model');

const getAllTasks = (req, reply) => {
  const { boardId } = req.params;
  const allTasks = tasksService.getAllTasks(boardId);

  reply.send(allTasks);
};

const getTask = (req, reply) => {
  const { boardId } = req.params;
  const { taskId } = req.params;
  const task = tasksService.getTask(boardId, taskId);

  if (task) {
    reply.send(task);
  } else {
    reply.status(404).send({
      message: 'Task not found',
    });
  }
};

const addTask = (req, reply) => {
  const { boardId } = req.params;
  const { body } = req;

  const task = tasksService.addTask(body, boardId);
  reply.code(201).send(task);
};

const updateTask = (req, reply) => {
  const { boardId } = req.params;
  const { taskId } = req.params;
  const { body } = req;

  const task = tasksService.updateTask(body, boardId, taskId);

  if (task) {
    reply.send(task);
  } else {
    reply.status(404).send({
      message: 'Task not found',
    });
  }
};

const removeTask = (req, reply) => {
  const { boardId } = req.params;
  const { taskId } = req.params;

  if (tasksService.removeTask(boardId, taskId)) {
    reply.code(204).send();
  } else {
    reply.status(404).send({
      message: 'Task not found',
    });
  }
};

function taskRoutes(app, options, done) {
  app.get('/boards/:boardId/tasks', tasksModel.getAllTasks, getAllTasks);
  app.get('/boards/:boardId/tasks/:taskId', tasksModel.getTask, getTask);
  app.post('/boards/:boardId/tasks', tasksModel.addTask, addTask);
  app.put('/boards/:boardId/tasks/:taskId', tasksModel.updateTask, updateTask);
  app.delete(
    '/boards/:boardId/tasks/:taskId',
    tasksModel.removeTask,
    removeTask
  );

  done();
}

module.exports = taskRoutes;
