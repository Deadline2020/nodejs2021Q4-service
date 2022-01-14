import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from 'fastify';

import * as tasksService from './task.service';
import * as tasksSchema from './task.schema';
import { Task } from '../../common/types';

interface Params {
  boardId: string;
  taskId: string;
}

interface Request extends FastifyRequest {
  body: Task;
}

/**
 * The route handler function. Requests the all task records with the corresponding board ID, and then sends them as a server response.
 *
 * @param req - http request object
 * @param reply - http reply object
 */
const getAllTasksByBoard = (req: FastifyRequest, reply: FastifyReply): void => {
  const { boardId } = req.params as Params;
  const allTasks: Task[] = tasksService.getAllTasksByBoard(boardId);

  reply.send(allTasks);
};

/**
 * The route handler function. Requests the task record with the corresponding task and board IDs, and then sends it as a server response if the record was found, or send a `Task not found` message if not.
 *
 * @param req - http request object
 * @param reply - http reply object
 */
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

/**
 * The route handler function. Sends a request to create the task record, and then sends new task record as a server response.
 *
 * @param req - http request object
 * @param reply - http reply object
 */
const addTask = (req: FastifyRequest, reply: FastifyReply): void => {
  const { boardId } = req.params as Params;
  const { body } = req as Request;
  const task: Task = tasksService.addTask(body, boardId);

  reply.code(201).send(task);
};

/**
 * The route handler function. Sends a request to update the task record with the corresponding task and board IDs, and then sends updated task record as a server response if the record was found, or send a `Task not found` message if not.
 *
 * @param req - http request object
 * @param reply - http reply object
 */
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

/**
 * The route handler function. Sends a request to delete the task record with the corresponding task and board IDs, and then sends status code 204 if the record was deleted, or send a `Task not found` message if not.
 *
 * @param req - http request object
 * @param reply - http reply object
 */
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

/**
 * The function provide set of routes. To activate routes, use the `fastify.register()` method.

 * @param app - instance of fastify server
 * @param _ - set of options (not used)
 * @param done -  callback function
 */
function taskRoutes(
  app: FastifyInstance,
  _: FastifyPluginOptions,
  done: () => void
): void {
  app.get(
    '/boards/:boardId/tasks',
    tasksSchema.getAllTasks,
    getAllTasksByBoard
  );
  app.get('/boards/:boardId/tasks/:taskId', tasksSchema.getTask, getTask);
  app.post('/boards/:boardId/tasks', tasksSchema.addTask, addTask);
  app.put('/boards/:boardId/tasks/:taskId', tasksSchema.updateTask, updateTask);
  app.delete(
    '/boards/:boardId/tasks/:taskId',
    tasksSchema.removeTask,
    removeTask
  );

  done();
}

export default taskRoutes;
