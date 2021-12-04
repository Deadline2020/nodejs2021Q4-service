const { v4: uuid } = require('uuid');

const tasksRepo = require('./task.memory.repository');

const getAllTasksByUser = (userId) => tasksRepo.getAllTasksByUser(userId);

const getAllTasksByBoard = (boardID) => tasksRepo.getAllTasksByBoard(boardID);

const getTask = (boardId, taskId) => {
  const task = tasksRepo.getTask(taskId);

  return task?.boardId === boardId ? task : null;
};

const addTask = (body, boardId) => {
  const task = { ...body };

  task.id = uuid();
  task.boardId = boardId;
  tasksRepo.addTask(task);

  return task;
};

const updateTask = (body, boardId, taskId) => {
  const indexDB = tasksRepo.getIndexDB(taskId);

  if (indexDB !== -1) {
    let task = tasksRepo.getTaskByIndexDB(indexDB);

    if (task.boardId === boardId) {
      const newData = { ...body };

      task = { ...task, ...newData };
      tasksRepo.updateTask(task, indexDB);

      return task;
    }
  }

  return false;
};

const removeTask = (boardId, taskId) => {
  const indexDB = tasksRepo.getIndexDB(taskId);

  if (indexDB !== -1) {
    const task = tasksRepo.getTaskByIndexDB(indexDB);

    if (task.boardId === boardId) {
      tasksRepo.removeTask(indexDB);

      return true;
    }
  }

  return false;
};

module.exports = {
  getAllTasksByUser,
  getAllTasksByBoard,
  getTask,
  addTask,
  updateTask,
  removeTask,
};
