const boardDB = [];

const getAllBoards = () => boardDB;

const getBoard = (boardId) => boardDB.find((board) => board.id === boardId);

const addBoard = (board) => boardDB.push(board);

const updateBoard = (board, indexDB) => {
  boardDB.splice(indexDB, 1, board);
};

const removeBoard = (indexDB) => {
  boardDB.splice(indexDB, 1);
};

const getIndexDB = (boardId) => boardDB.findIndex((board) => board.id === boardId);

const getBoardByIndexDB = (indexDB) => boardDB[indexDB];

module.exports = {
  getAllBoards,
  getBoard,
  addBoard,
  updateBoard,
  removeBoard,
  getIndexDB,
  getBoardByIndexDB,
};
