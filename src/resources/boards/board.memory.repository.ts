import { Board } from '../../common/types';

const boardDB: Board[] = [];

/**
 * The function returns all board records from the database
 *
 * @returns The array of board records
 */
export const getAllBoards = (): Board[] => boardDB;

/**
 * The function returns the board record with the corresponding ID
 *
 * @param boardId - board ID
 * @returns The board record if the record was found or `undefined` if not
 */
export const getBoard = (boardId: string): Board | undefined =>
  boardDB.find((board: Board): boolean => board.id === boardId);

/**
 * The function of creating a board record in the database
 *
 * @param board - board data
 */
export const addBoard = (board: Board) => {
  boardDB.push(board);
};

/**
 * The function of updating the board record in the database
 *
 * @param board - board data
 * @param indexDB - index of board record in database
 */
export const updateBoard = (board: Board, indexDB: number): void => {
  boardDB.splice(indexDB, 1, board);
};

/**
 * The function of deleting the board record from the database
 *
 * @param indexDB - index of board record in database
 */
export const removeBoard = (indexDB: number): void => {
  boardDB.splice(indexDB, 1);
};

/**
 * The function returns the index of board record in database
 *
 * @param boardId - board ID
 * @returns The index of board record in database if the record was found or `-1` if not
 */
export const getIndexDB = (boardId: string): number =>
  boardDB.findIndex((board: Board): boolean => board.id === boardId);

/**
 * The function returns the board record with the corresponding index in database
 *
 * @param indexDB - index of board record in database
 * @returns The board record
 */
export const getBoardByIndexDB = (indexDB: number): Board => boardDB[indexDB];
