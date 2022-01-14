import 'reflect-metadata';
import fastify, { FastifyInstance } from 'fastify';

import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';
import logger from './common/logger';
import setHandlers from './common/setHandlers';

const app: FastifyInstance = fastify({ logger, disableRequestLogging: true });

setHandlers(app);

app.register(userRouter);
app.register(boardRouter);
app.register(taskRouter);

// Promise.reject(Error('Promise Oops!'));
// throw Error(' Error Oops!');

export default app;
