import fastify, { FastifyInstance } from 'fastify';
import pino from 'pino';

import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';
import loggerConfig from './common/logger_config';

const logger = pino(loggerConfig);

const app: FastifyInstance = fastify({ logger });

app.register(userRouter);
app.register(boardRouter);
app.register(taskRouter);

export default app;
