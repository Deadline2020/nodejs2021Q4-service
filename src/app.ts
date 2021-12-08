// import fastify from 'fastify';
import fastify = require('fastify');
// import http = require('http');

import userRouter = require('./resources/users/user.router');
// import boardRouter = require('./resources/users/board.router.js');
// import taskRouter = require('./resources/users/task.router.js');

const app: fastify.FastifyInstance = fastify.default();
// export const server = fastify();

app.register(userRouter as fastify.FastifyPluginCallback);
// app.register(require('./resources/boards/board.router.js'));
// app.register(require('./resources/tasks/task.router.js'));

// module.exports = app;
export = app;
// export default server;
