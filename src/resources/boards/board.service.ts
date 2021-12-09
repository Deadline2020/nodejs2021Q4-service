import { v4 as uuid } from 'uuid';

import * as boardsRepo from './board.memory.repository';
import * as tasksService from '../tasks/task.service';
import { Board, Column } from './board.model';
import { Task } from '../tasks/task.model';

export const getAllBoards = (): Board[] => boardsRepo.getAllBoards();

export const getBoard = (boardId: string): Board | undefined =>
  boardsRepo.getBoard(boardId);

export const addBoard = (body: Board): Board => {
  const board: Board = { ...body };
  const columns: Column[] = (board.columns as Column[]).map(
    (column: Column) => {
      const newColumn: Column = { ...column };

      newColumn.id = uuid();

      return newColumn;
    }
  );

  board.id = uuid();
  board.columns = columns;
  boardsRepo.addBoard(board);

  return board;
};

export const updateBoard = (
  body: Board,
  boardId: string
): Board | undefined => {
  const indexDB: number = boardsRepo.getIndexDB(boardId);

  if (indexDB !== -1) {
    let board: Board = boardsRepo.getBoardByIndexDB(indexDB);
    const newData: Board = { ...body };

    delete newData.columns;
    board = { ...board, ...newData };
    boardsRepo.updateBoard(board, indexDB);

    return board;
  }

  return undefined;
};

export const removeBoard = (boardId: string): boolean => {
  const indexDB: number = boardsRepo.getIndexDB(boardId);

  if (indexDB !== -1) {
    const tasks: Task[] = tasksService.getAllTasksByBoard(boardId);

    tasks.forEach((task: Task) => {
      tasksService.removeTask(boardId, task.id as string);
    });
    boardsRepo.removeBoard(indexDB);

    return true;
  }

  return false;
};
