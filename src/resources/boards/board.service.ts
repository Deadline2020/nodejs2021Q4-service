import * as boardsRepo from './board.memory.repository';
import { Board } from './board.model';

/**
 * The function returns all board records from the database
 *
 * @returns The array of board records
 */
export const getAllBoards = (): Promise<Board[]> => boardsRepo.getAllBoards();

/**
 * The function returns the board record with the corresponding ID
 *
 * @param boardId - board ID
 * @returns The board record if the record was found or `undefined` if not
 */
export const getBoard = (boardId: string): Promise<Board | undefined> =>
  boardsRepo.getBoard(boardId);

/**
 * The function of creating a board record in the database
 *
 * @param body - board data
 * @returns The new board record
 */
export const addBoard = (body: Board): Promise<Board> =>
  boardsRepo.addBoard(body);

/**
 * The function of updating the board record in the database
 *
 * @param body - board data
 * @param boardId - board ID
 * @returns The updated board record if the record was found or `undefined` if not
 */
export const updateBoard = (
  body: Board,
  boardId: string
): Promise<Board | undefined> => boardsRepo.updateBoard(body, boardId);

/**
 * The function of deleting the board record from the database
 *
 * @param boardId - board ID
 * @returns The value is `true` if the deletion was successful and `false` if not
 */
export const removeBoard = (boardId: string): Promise<Board | undefined> =>
  boardsRepo.removeBoard(boardId);
