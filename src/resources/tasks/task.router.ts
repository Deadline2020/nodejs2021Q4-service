import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from 'fastify';

import * as tasksService from './task.service';
import * as tasksModel from './task.model';
import { Task } from './task.model';

interface Params {
  boardId: string;
  taskId: string;
}

interface Request extends FastifyRequest {
  body: Task;
}

const getAllTasksByBoard = (req: FastifyRequest, reply: FastifyReply): void => {
  const { boardId } = req.params as Params;
  const allTasks: Task[] = tasksService.getAllTasksByBoard(boardId);

  reply.send(allTasks);
};

const getTask = (req: FastifyRequest, reply: FastifyReply): void => {
  const { boardId } = req.params as Params;
  const { taskId } = req.params as Params;
  const task: Task | undefined = tasksService.getTask(boardId, taskId);

  if (task) {
    reply.send(task);
  } else {
    reply.status(404).send({
      message: 'Task not found',
    });
  }
};

const addTask = (req: FastifyRequest, reply: FastifyReply): void => {
  const { boardId } = req.params as Params;
  const { body } = req as Request;
  const task: Task = tasksService.addTask(body, boardId);

  reply.code(201).send(task);
};

const updateTask = (req: FastifyRequest, reply: FastifyReply): void => {
  const { boardId } = req.params as Params;
  const { taskId } = req.params as Params;
  const { body } = req as Request;
  const task: Task | undefined = tasksService.updateTask(body, boardId, taskId);

  if (task) {
    reply.send(task);
  } else {
    reply.status(404).send({
      message: 'Task not found',
    });
  }
};

const removeTask = (req: FastifyRequest, reply: FastifyReply): void => {
  const { boardId } = req.params as Params;
  const { taskId } = req.params as Params;

  if (tasksService.removeTask(boardId, taskId)) {
    reply.code(204).send();
  } else {
    reply.status(404).send({
      message: 'Task not found',
    });
  }
};

function taskRoutes(
  app: FastifyInstance,
  _: FastifyPluginOptions,
  done: () => void
): void {
  app.get('/boards/:boardId/tasks', tasksModel.getAllTasks, getAllTasksByBoard);
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

export default taskRoutes;
