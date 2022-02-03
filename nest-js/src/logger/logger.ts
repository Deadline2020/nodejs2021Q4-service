import { Logger } from '@nestjs/common';
import { FastifyRequest } from 'fastify';

import { LogInterceptor } from 'src/interceptor/log.interceptor';

const logger = (request: FastifyRequest) => {
  const logger = new Logger(LogInterceptor.name);

  logger.log({
    method: request.method,
    url: request.url,
    params: request.params,
    queryParams: request.query,
    reqBody: request.body,
  });
};

export default logger;
