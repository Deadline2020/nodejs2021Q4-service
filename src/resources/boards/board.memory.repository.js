const boardDB = [];

const getAllBoards = () => boardDB;
const getBoard = (id) => boardDB.find((board) => board.id === id);
const addBoard = (board) => boardDB.push(board);
const updateBoard = (board, indexDB) => {
  boardDB.splice(indexDB, 1, board);
};
const removeBoard = (indexDB) => {
  boardDB.splice(indexDB, 1);
};

const getIndexDB = (id) => boardDB.findIndex((board) => board.id === id);
const getBoardByIndexDB = (index) => boardDB[index];

module.exports = {
  getAllBoards,
  getBoard,
  addBoard,
  updateBoard,
  removeBoard,
  getIndexDB,
  getBoardByIndexDB,
};
