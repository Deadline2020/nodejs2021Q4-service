import { FastifyReply, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';

import config from '../common/config';

/**
 * The token handler function. Validates the token and sends "Unauthorized" if the token is invalid.
 *
 * @param req - http request object
 * @param reply - http reply object
 */
const checkToken = (req: FastifyRequest, reply: FastifyReply): void => {
  if (
    req.url.startsWith('/login') ||
    req.url.startsWith('/doc') ||
    req.url === '/'
  ) {
    return;
  }

  const [typeToken, token] = req.headers.authorization?.split(' ') || ['', ''];

  if (typeToken !== 'Bearer') {
    reply.status(401).send({
      message: 'Unauthorized',
    });
    return;
  }

  try {
    jwt.verify(token, config.JWT_SECRET_KEY);
  } catch (error) {
    reply.status(401).send({
      message: 'Unauthorized',
    });
  }
};

export default checkToken;

// 7da0b2c1-b34d-4ecf-ac8e-97dcb08b5d73
// $2b$10$UJ8Hr9F82OJ2vmoRNJYbL.eYMwjUO.sNMzGrrcXrbLg6y.XsfoPte
