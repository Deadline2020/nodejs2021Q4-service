const { v4: uuid } = require('uuid');

const tasksRepo = require('./task.memory.repository');

const getAllTasksByUser = (id) => tasksRepo.getAllTasksByUser(id);

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
  // console.log('taskId в UPDATE:: ', taskId);
  // console.log('body в UPDATE: ', body);

  if (indexDB !== -1) {
    let task = tasksRepo.getTaskByIndexDB(indexDB);
    // console.log('task в UPDATE: ', task);

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
  console.log('????????taskId: ', taskId);
  const indexDB = tasksRepo.getIndexDB(taskId);
  console.log('!!!!!!!!!!!!!!indexDB: ', indexDB);

  if (indexDB !== -1) {
    const task = tasksRepo.getTaskByIndexDB(indexDB);

    if (task.boardId === boardId) {
      tasksRepo.removeTask(indexDB);
      console.log('!!!!!!!!!!!!!!Delete task: ', task);
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
