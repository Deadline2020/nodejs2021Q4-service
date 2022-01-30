import { DeleteResult, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BoardDto } from './board.dto';
import { Board } from './board.model';
import { ColumnService } from '../columns/column.service';
import { Col } from '../columns/column.model';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private boardRepo: Repository<Board>,
    private readonly columnService: ColumnService,
  ) {}

  async addBoard(boardDto: BoardDto): Promise<Board | undefined> {
    const newBoard: Board = this.boardRepo.create();
    newBoard.title = boardDto.title;
    await this.boardRepo.save(newBoard);

    await Promise.all(
      boardDto.columns.map((column: Col) => {
        column.board = newBoard;
        return this.columnService.addColumn(column);
      }),
    );

    return this.boardRepo
      .createQueryBuilder('board')
      .where('board.id=:id', { id: newBoard.id })
      .leftJoinAndSelect('board.columns', 'column')
      .orderBy('column.order', 'ASC')
      .getOne();
  }

  async getAllBoards(): Promise<Board[]> {
    return await this.boardRepo
      .createQueryBuilder('board')
      .leftJoinAndSelect('board.columns', 'column')
      .orderBy('column.order', 'ASC')
      .getMany();
  }

  async getBoard(boardId: string): Promise<Board | undefined> {
    return await this.boardRepo
      .createQueryBuilder('board')
      .where('board.id=:id', { id: boardId })
      .leftJoinAndSelect('board.columns', 'column')
      .orderBy('column.order', 'ASC')
      .getOne();
  }

  async updateBoard(
    boardId: string,
    boardDto: BoardDto,
  ): Promise<Board | undefined> {
    const board: Board | undefined = await this.getBoard(boardId);

    if (board) {
      this.boardRepo.merge(board, boardDto);
      return await this.boardRepo.save(board);
    }

    return undefined;
  }

  async removeBoard(boardId: string): Promise<DeleteResult> {
    return await this.boardRepo.delete(boardId);
  }
}
