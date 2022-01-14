import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from 'fastify';

import * as boardsService from './board.service';
import * as boardsSchema from './board.schema';
import { Board } from '../../common/types';

interface Params {
  boardId: string;
}

interface Request extends FastifyRequest {
  body: Board;
}

/**
 * The route handler function. Requests the all board records from the database, and then sends them as a server response.
 *
 * @param _ - http request object (not used)
 * @param reply - http reply object
 */
const getAllBoards = (_: FastifyRequest, reply: FastifyReply): void => {
  const allBoards: Board[] = boardsService.getAllBoards();

  reply.send(allBoards);
};

/**
 * The route handler function. Requests the board record with the corresponding ID, and then sends it as a server response if the record was found, or send a `Board not found` message if not.
 *
 * @param req - http request object
 * @param reply - http reply object
 */
const getBoard = (req: FastifyRequest, reply: FastifyReply): void => {
  const { boardId } = req.params as Params;
  const board: Board | undefined = boardsService.getBoard(boardId);

  if (board) {
    reply.send(board);
  } else {
    reply.status(404).send({
      message: 'Board not found',
    });
  }
};

/**
 * The route handler function. Sends a request to create the board record, and then sends new board record as a server response.
 *
 * @param req - http request object
 * @param reply - http reply object
 */
const addBoard = (req: FastifyRequest, reply: FastifyReply): void => {
  const { body } = req as Request;
  const board: Board = boardsService.addBoard(body);

  reply.code(201).send(board);
};

/**
 * The route handler function. Sends a request to update the board record with the corresponding ID, and then sends updated board record as a server response if the record was found, or send a `Board not found` message if not.
 *
 * @param req - http request object
 * @param reply - http reply object
 */
const updateBoard = (req: FastifyRequest, reply: FastifyReply): void => {
  const { boardId } = req.params as Params;
  const { body } = req as Request;
  const board: Board | undefined = boardsService.updateBoard(body, boardId);

  if (board) {
    reply.send(board);
  } else {
    reply.status(404).send({
      message: 'Board not found',
    });
  }
};

/**
 * The route handler function. Sends a request to delete the board record with the corresponding ID, and then sends status code 204 if the record was deleted, or send a `Board not found` message if not.
 *
 * @param req - http request object
 * @param reply - http reply object
 */
const removeBoard = (req: FastifyRequest, reply: FastifyReply): void => {
  const { boardId } = req.params as Params;

  if (boardsService.removeBoard(boardId)) {
    reply.code(204).send();
  } else {
    reply.status(404).send({
      message: 'Board not found',
    });
  }
};

/**
 * The function provide set of routes. To activate routes, use the `fastify.register()` method.

 * @param app - instance of fastify server
 * @param _ - set of options (not used)
 * @param done -  callback function
 */
function boardRoutes(
  app: FastifyInstance,
  _: FastifyPluginOptions,
  done: () => void
): void {
  app.get('/boards', boardsSchema.getAllBoards, getAllBoards);
  app.get('/boards/:boardId', boardsSchema.getBoard, getBoard);
  app.post('/boards', boardsSchema.addBoard, addBoard);
  app.put('/boards/:boardId', boardsSchema.updateBoard, updateBoard);
  app.delete('/boards/:boardId', boardsSchema.removeBoard, removeBoard);

  done();
}

export default boardRoutes;
