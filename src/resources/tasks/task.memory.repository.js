const taskDB = [];

const getAllTasksByUser = (id) => taskDB.filter((task) => task.userId === id);
const getAllTasksByBoard = (boardId) =>
  taskDB.filter((task) => task.boardId === boardId);
const getTask = (id) => taskDB.find((task) => task.id === id);
const addTask = (task) => taskDB.push(task);
const updateTask = (task, indexDB) => {
  taskDB.splice(indexDB, 1, task);
};
const removeTask = (indexDB) => {
  taskDB.splice(indexDB, 1);
};

const getIndexDB = (id) => taskDB.findIndex((task) => task.id === id);
const getTaskByIndexDB = (index) => taskDB[index];

module.exports = {
  getAllTasksByUser,
  getAllTasksByBoard,
  getTask,
  addTask,
  updateTask,
  removeTask,
  getIndexDB,
  getTaskByIndexDB,
};
