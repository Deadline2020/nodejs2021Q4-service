const taskDB = [];

const getAllTasksByUser = (userId) =>
  taskDB.filter((task) => task.userId === userId);

const getAllTasksByBoard = (boardId) =>
  taskDB.filter((task) => task.boardId === boardId);

const getTask = (taskId) => taskDB.find((task) => task.id === taskId);

const addTask = (task) => taskDB.push(task);

const updateTask = (task, indexDB) => {
  taskDB.splice(indexDB, 1, task);
};

const removeTask = (indexDB) => {
  taskDB.splice(indexDB, 1);
};

const getIndexDB = (taskId) => taskDB.findIndex((task) => task.id === taskId);

const getTaskByIndexDB = (indexDB) => taskDB[indexDB];

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
