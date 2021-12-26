import fastify, { FastifyInstance } from 'fastify';

import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';
import logger from './logger';

const app: FastifyInstance = fastify({ logger, disableRequestLogging: true });

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

app.addHook('onResponse', (req, reply, done) => {
  if (reply.statusCode >= 500) {
    reply.log.error(
      {
        ID: req.id,
        statusCode: reply.raw.statusCode,
        message: reply.raw.statusMessage,
      },
      'sent response'
    );
  } else if (reply.statusCode < 500 && reply.statusCode >= 400) {
    reply.log.warn(
      {
        ID: req.id,
        statusCode: reply.raw.statusCode,
        message: reply.raw.statusMessage,
      },
      'sent response'
    );
  } else {
    reply.log.info(
      {
        ID: req.id,
        statusCode: reply.raw.statusCode,
        message: reply.raw.statusMessage,
      },
      'sent response'
    );
  }
  done();
});

app.setErrorHandler((error, req, reply): void => {
  if (reply.statusCode >= 500) {
    reply.status(500).send({
      message: 'Internal Server Error',
    });
  } else if (reply.statusCode >= 400) {
    reply.status(error.statusCode as number).send(error.message);
  } else {
    reply.status(500).send({
      message: 'Internal Server Error',
    });
  }
});

process.on('uncaughtException', (error) => {
  app.log.fatal(
    {
      statusCode: '500',
      message: 'Internal Server Error',
    },
    error.message
  );

  setTimeout(() => {
    process.exit(1);
  }, 1000);
});

process.on('unhandledRejection', (reason: Error) => {
  app.log.fatal(
    {
      statusCode: '500',
      message: 'Internal Server Error',
    },
    reason.message
  );

  setTimeout(() => {
    process.exit(1);
  }, 1000);
});

app.register(userRouter);
app.register(boardRouter);
app.register(taskRouter);

// Promise.reject(Error('Promise Oops!'));
// throw Error(' Error Oops!');

export default app;
