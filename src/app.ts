import fastify, { FastifyInstance, FastifyPluginCallback } from 'fastify';

import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';

const app: FastifyInstance = fastify();

app.register(userRouter as FastifyPluginCallback);
app.register(boardRouter as FastifyPluginCallback);
app.register(taskRouter as FastifyPluginCallback);

export default app;
