import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from 'fastify';

import { IUser } from '../common/types';
import * as loginSchema from './login.schema';
import * as loginService from './login.service';

interface Request extends FastifyRequest {
  body: IUser;
}

/**
 * The route handler function. Requests the token with the corresponding login and password of user, and sends it as a server response if the user record was found, or send a `Forbidden` message if not.
 *
 * @param req - http request object
 * @param reply - http reply object
 */
const getToken = async (
  req: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const { body } = req as Request;
  const { login, password } = body;

  const token: string | undefined = await loginService.getToken(
    login,
    password as string
  );

  if (token) {
    reply.send({ token });
  } else {
    reply.status(403).send({
      message: 'Forbidden',
    });
  }
};

/**
 * The function provide set of routes. To activate routes, use the `fastify.register()` method.

 * @param app - instance of fastify server
 * @param _ - set of options (not used)
 * @param done -  callback function
 */
function loginRoutes(
  app: FastifyInstance,
  _: FastifyPluginOptions,
  done: () => void
): void {
  app.post('/login', loginSchema.getToken, getToken);

  done();
}

export default loginRoutes;
