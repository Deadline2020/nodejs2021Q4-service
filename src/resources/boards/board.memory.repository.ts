import { Col } from '../columns/column.model';
import { Board } from './board.model';

/**
 * The function returns all board records from the database
 *
 * @returns The array of board records
 */
export const getAllBoards = async (): Promise<Board[]> =>
  Board.createQueryBuilder('board')
    .leftJoinAndSelect('board.columns', 'column')
    .orderBy('column.order', 'ASC')
    .getMany();

/**
 * The function returns the board record with the corresponding ID
 *
 * @param boardId - board ID
 * @returns The board record if the record was found or `undefined` if not
 */
export const getBoard = async (boardId: string): Promise<Board | undefined> =>
  Board.createQueryBuilder('board')
    .where('board.id=:id', { id: boardId })
    .leftJoinAndSelect('board.columns', 'column')
    .orderBy('column.order', 'ASC')
    .getOne();

/**
 * The function of creating a board record in the database
 *
 * @param board - board data
 */
export const addBoard = async (board: Board): Promise<Board | undefined> => {
  const newBoard = new Board();
  newBoard.title = board.title;
  await newBoard.save();

  const columns: Col[] = [];

  board.columns.forEach(async (column) => {
    const newColumn = new Col();
    newColumn.title = column.title;
    newColumn.order = column.order;
    newColumn.board = newBoard;
    columns.push(newColumn);
  });

  await Promise.all(columns.map((column: Col) => column.save()));

  return Board.createQueryBuilder('board')
    .where('board.id=:id', { id: newBoard.id })
    .leftJoinAndSelect('board.columns', 'column')
    .orderBy('column.order', 'ASC')
    .getOne();
};

/**
 * The function of updating the board record in the database
 *
 * @param board - board data
 * @param id - board id
 */
export const updateBoard = async (
  boardData: Board,
  id: string
): Promise<Board | undefined> => {
  const board = await getBoard(id);

  if (board) {
    Board.merge(board, boardData);
    await board.save();
    return board;
  }

  return undefined;
};

/**
 * The function of deleting the board record from the database
 *
 * @param id - board id
 */
export const removeBoard = async (id: string): Promise<Board | undefined> => {
  const board = await getBoard(id);

  if (board) {
    return Board.remove(board);
  }

  return undefined;
};
