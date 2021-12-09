import { Board } from './board.model';

export const boardDB: Board[] = [];

export const getAllBoards = (): Board[] => boardDB;

export const getBoard = (boardId: string): Board | undefined =>
  boardDB.find((board: Board): boolean => board.id === boardId);

export const addBoard = (board: Board): number => boardDB.push(board);

export const updateBoard = (board: Board, indexDB: number): void => {
  boardDB.splice(indexDB, 1, board);
};

export const removeBoard = (indexDB: number): void => {
  boardDB.splice(indexDB, 1);
};

export const getIndexDB = (boardId: string): number =>
  boardDB.findIndex((board: Board): boolean => board.id === boardId);

export const getBoardByIndexDB = (indexDB: number): Board => boardDB[indexDB];
