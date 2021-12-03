const taskDB = [];

const getAllTasks = (boardId) =>
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
  getAllTasks,
  getTask,
  addTask,
  updateTask,
  removeTask,
  getIndexDB,
  getTaskByIndexDB,
};
