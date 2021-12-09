import fastify, { FastifyInstance, FastifyPluginCallback } from 'fastify';

import userRouter from './resources/users/user.router';
// import boardRouter = require('./resources/users/board.router.js');
import taskRouter from './resources/tasks/task.router';

const app: FastifyInstance = fastify();

app.register(userRouter as FastifyPluginCallback);
app.register(taskRouter as FastifyPluginCallback);
// app.register(require('./resources/boards/board.router.js'));
// app.register(require('./resources/tasks/task.router.js'));

export default app;
