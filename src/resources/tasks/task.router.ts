import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from 'fastify';

import * as tasksService from './task.service';
import * as tasksSchema from './task.schema';
import { ITask } from '../../common/types';
import { Task } from './task.model';

interface Params {
  boardId: string;
  taskId: string;
}

interface Request extends FastifyRequest {
  body: ITask;
}

/**
 * The route handler function. Requests the all task records with the corresponding board ID, and then sends them as a server response.
 *
 * @param req - http request object
 * @param reply - http reply object
 */
const getAllTasksByBoard = async (
  req: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const { boardId } = req.params as Params;
  const allTasks: Task[] = await tasksService.getAllTasksByBoard(boardId);

  reply.send(allTasks);
};

/**
 * The route handler function. Requests the task record with the corresponding task and board IDs, and then sends it as a server response if the record was found, or send a `Task not found` message if not.
 *
 * @param req - http request object
 * @param reply - http reply object
 */
const getTask = async (
  req: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const { taskId } = req.params as Params;
  const task: Task | undefined = await tasksService.getTask(taskId);

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
const addTask = async (
  req: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const { boardId } = req.params as Params;
  const { body } = req as Request;
  const task: Task = await tasksService.addTask(body as Task, boardId);

  reply.code(201).send(task);
};

/**
 * The route handler function. Sends a request to update the task record with the corresponding task and board IDs, and then sends updated task record as a server response if the record was found, or send a `Task not found` message if not.
 *
 * @param req - http request object
 * @param reply - http reply object
 */
const updateTask = async (
  req: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const { taskId } = req.params as Params;
  const { body } = req as Request;
  const task: Task | undefined = await tasksService.updateTask(
    body as Task,
    taskId
  );

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
const removeTask = async (
  req: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const { taskId } = req.params as Params;

  if (await tasksService.removeTask(taskId)) {
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
