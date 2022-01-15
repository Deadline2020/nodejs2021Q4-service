import { randomUUID } from 'crypto';

import * as boardsRepo from './board.memory.repository';
import * as tasksService from '../tasks/task.service';
import { IBoard, IColumn, ITask } from '../../common/types';

/**
 * The function returns all board records from the database
 *
 * @returns The array of board records
 */
export const getAllBoards = (): IBoard[] => boardsRepo.getAllBoards();

/**
 * The function returns the board record with the corresponding ID
 *
 * @param boardId - board ID
 * @returns The board record if the record was found or `undefined` if not
 */
export const getBoard = (boardId: string): IBoard | undefined =>
  boardsRepo.getBoard(boardId);

/**
 * The function of creating a board record in the database
 *
 * @param body - board data
 * @returns The new board record
 */
export const addBoard = (body: IBoard): IBoard => {
  const board: IBoard = { ...body };
  const columns: IColumn[] = (board.columns as IColumn[]).map(
    (column: IColumn) => {
      const newColumn: IColumn = { ...column };

      newColumn.id = randomUUID();

      return newColumn;
    }
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
  body: IBoard,
  boardId: string
): IBoard | undefined => {
  const indexDB: number = boardsRepo.getIndexDB(boardId);

  if (indexDB !== -1) {
    let board: IBoard = boardsRepo.getBoardByIndexDB(indexDB);
    const newData: IBoard = { ...body };

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
    const tasks: ITask[] = tasksService.getAllTasksByBoard(boardId);

    tasks.forEach((task: ITask) => {
      tasksService.removeTask(boardId, task.id as string);
    });
    boardsRepo.removeBoard(indexDB);

    return true;
  }

  return false;
};
