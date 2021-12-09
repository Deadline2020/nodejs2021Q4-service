import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from 'fastify';

import * as boardsService from './board.service';
import * as boardsModel from './board.model';
import { Board } from './board.model';

interface Params {
  boardId: string;
}

interface Request extends FastifyRequest {
  body: Board;
}

const getAllBoards = (_: FastifyRequest, reply: FastifyReply): void => {
  const allBoards: Board[] = boardsService.getAllBoards();

  reply.send(allBoards);
};

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

const addBoard = (req: FastifyRequest, reply: FastifyReply): void => {
  const { body } = req as Request;
  const board: Board = boardsService.addBoard(body);

  reply.code(201).send(board);
};

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

function boardRoutes(
  app: FastifyInstance,
  _: FastifyPluginOptions,
  done: () => void
): void {
  app.get('/boards', boardsModel.getAllBoards, getAllBoards);
  app.get('/boards/:boardId', boardsModel.getBoard, getBoard);
  app.post('/boards', boardsModel.addBoard, addBoard);
  app.put('/boards/:boardId', boardsModel.updateBoard, updateBoard);
  app.delete('/boards/:boardId', boardsModel.removeBoard, removeBoard);

  done();
}

export default boardRoutes;
