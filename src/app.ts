import fastify, { FastifyInstance, FastifyReply } from 'fastify';

import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';
import logger from './logger';

const app: FastifyInstance = fastify({ logger, disableRequestLogging: true });

// app.addHook('onRequest', (req, _, done) => {
//   req.log.info(
//     {
//       ID: req.id,
//       method: req.method,
//       url: req.url,
//       queryParams: req.query,
//       body: req.body,
//     },
//     'received request'
//   );
//   done();
// });

app.addHook('preHandler', (req, _reply, done) => {
  req.log.info(
    {
      ID: req.id,
      method: req.method,
      url: req.url,
      queryParams: req.query,
      body: req.body,
    },
    'received request'
  );
  done();
});

app.addHook('onResponse', (req, reply: FastifyReply, done) => {
  req.log.info(
    { ID: req.id, statusCode: reply.raw.statusCode },
    'sent response'
  );
  done();
});

app.register(userRouter);
app.register(boardRouter);
app.register(taskRouter);

export default app;
