const { v4: uuid } = require('uuid');

const boardsRepo = require('./board.memory.repository');

const getAllBoards = () => boardsRepo.getAllBoards();

const getBoard = (id) => boardsRepo.getBoard(id);

const addBoard = (body) => {
  const board = { ...body };
  const columns = board.columns.map((column) => {
    const newColumn = { ...column };
    newColumn.id = uuid();
    return newColumn;
  });

  board.id = uuid();
  board.columns = columns;

  boardsRepo.addBoard(board);

  return board;
};

const updateBoard = (body, id) => {
  const indexDB = boardsRepo.getIndexDB(id);

  if (indexDB !== -1) {
    let board = boardsRepo.getBoardByIndexDB(indexDB);
    const newData = { ...body };
    delete newData.columns;
    board = { ...board, ...newData };

    boardsRepo.updateBoard(board, indexDB);
    return board;
  }
  return false;
};

const removeBoard = (id) => {
  const indexDB = boardsRepo.getIndexDB(id);

  if (indexDB !== -1) {
    boardsRepo.removeBoard(indexDB);
    return true;
  }
  return false;
};

module.exports = { getAllBoards, getBoard, addBoard, updateBoard, removeBoard };
