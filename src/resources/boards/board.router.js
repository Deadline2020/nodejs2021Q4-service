const boardsService = require('./board.service');
const boardsModel = require('./board.model');

const getAllBoards = (req, reply) => {
  const allBoards = boardsService.getAllBoards();

  reply.send(allBoards);
};

const getBoard = (req, reply) => {
  const { boardId } = req.params;
  const board = boardsService.getBoard(boardId);

  if (board) {
    reply.send(board);
  } else {
    reply.status(404).send({
      message: 'Board not found',
    });
  }
};

const addBoard = (req, reply) => {
  const { body } = req;
  const board = boardsService.addBoard(body);

  reply.code(201).send(board);
};

const updateBoard = (req, reply) => {
  const { boardId } = req.params;
  const { body } = req;
  const board = boardsService.updateBoard(body, boardId);

  if (board) {
    reply.send(board);
  } else {
    reply.status(404).send({
      message: 'Board not found',
    });
  }
};

const removeBoard = (req, reply) => {
  const { boardId } = req.params;

  if (boardsService.removeBoard(boardId)) {
    reply.code(204).send();
  } else {
    reply.status(404).send({
      message: 'Board not found',
    });
  }
};

function boardRoutes(app, options, done) {
  app.get('/boards', boardsModel.getAllBoards, getAllBoards);
  app.get('/boards/:boardId', boardsModel.getBoard, getBoard);
  app.post('/boards', boardsModel.addBoard, addBoard);
  app.put('/boards/:boardId', boardsModel.updateBoard, updateBoard);
  app.delete('/boards/:boardId', boardsModel.removeBoard, removeBoard);

  done();
}

module.exports = boardRoutes;
