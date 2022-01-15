import {
  FastifyError,
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from 'fastify';

interface ReplyLogMessage {
  ID: string;
  statusCode: number;
  message: string;
}

/**
 * The function sets the necessary error handlers.
 *
 * @param app - Fastify server instance
 */
const setHandlers = (app: FastifyInstance): void => {
  app.addHook(
    'preHandler',
    (req: FastifyRequest, _: FastifyReply, done: () => void) => {
      req.log.info(
        {
          ID: req.id,
          method: req.method,
          url: req.url,
          queryParams: req.query,
          body: req.body,
        },
        'received request',
      );
      done();
    },
  );

  app.addHook(
    'onResponse',
    (req: FastifyRequest, reply: FastifyReply, done: () => void) => {
      const replyLogMessage: ReplyLogMessage = {
        ID: req.id,
        statusCode: reply.raw.statusCode,
        message: reply.raw.statusMessage,
      };

      if (reply.statusCode >= 500) {
        reply.log.error(replyLogMessage, 'sent response');
      } else if (reply.statusCode < 500 && reply.statusCode >= 400) {
        reply.log.warn(replyLogMessage, 'sent response');
      } else {
        reply.log.info(replyLogMessage, 'sent response');
      }
      done();
    },
  );

  app.setErrorHandler(
    (error: FastifyError, _: FastifyRequest, reply: FastifyReply): void => {
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
    },
  );

  process.on('uncaughtException', (error: Error): void => {
    app.log.fatal(
      {
        statusCode: '500',
        message: 'Internal Server Error',
      },
      error.message,
    );

    setTimeout(() => {
      process.exit(1);
    }, 1000);
  });

  process.on('unhandledRejection', (reason: Error): void => {
    app.log.fatal(
      {
        statusCode: '500',
        message: 'Internal Server Error',
      },
      reason.message,
    );

    setTimeout(() => {
      process.exit(1);
    }, 1000);
  });
};

export default setHandlers;
