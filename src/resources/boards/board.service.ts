import { randomUUID } from 'crypto';

import * as boardsRepo from './board.memory.repository';
import * as tasksService from '../tasks/task.service';
import { Board, Column } from './board.model';
import { Task } from '../tasks/task.model';

/**
 * The function returns all board records from the database
 *
 * @returns The array of board records
 */
export const getAllBoards = (): Board[] => boardsRepo.getAllBoards();

/**
 * The function returns the board record with the corresponding ID
 *
 * @param boardId - board ID
 * @returns The board record if the record was found or `undefined` if not
 */
export const getBoard = (boardId: string): Board | undefined => boardsRepo.getBoard(boardId);

/**
 * The function of creating a board record in the database
 *
 * @param body - board data
 * @returns The new board record
 */
export const addBoard = (body: Board): Board => {
  const board: Board = { ...body };
  const columns: Column[] = (board.columns as Column[]).map(
    (column: Column) => {
      const newColumn: Column = { ...column };

      newColumn.id = randomUUID();

      return newColumn;
    },
  );

  board.id = randomUUID();
  board.columns = columns;
  boardsRepo.addBoard(board);

  return board;
};

/**
 * The function of updating the board record in the database
 *
 * @param body - board data
 * @param boardId - board ID
 * @returns The updated board record if the record was found or `undefined` if not
 */
export const updateBoard = (
  body: Board,
  boardId: string,
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

/**
 * The function of deleting the board record from the database
 *
 * @param boardId - board ID
 * @returns The value is `true` if the deletion was successful and `false` if not
 */
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
