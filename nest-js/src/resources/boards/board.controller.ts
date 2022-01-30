import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';

import { BoardService } from './board.service';
import { BoardDto } from './board.dto';
import { Board } from './board.model';
import STATUS_CODES from 'src/common/status-code';

@Controller('boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  async addBoard(@Body() boardDto: BoardDto): Promise<Board | undefined> {
    return await this.boardService.addBoard(boardDto);
  }

  @Get()
  async getAllBoards(): Promise<Board[]> {
    return await this.boardService.getAllBoards();
  }

  @Get(':boardId')
  async getBoard(@Param('boardId') boardId: string): Promise<Board> {
    const board: Board | undefined = await this.boardService.getBoard(boardId);

    if (!board) {
      throw new NotFoundException('Board not found');
    }

    return board;
  }

  @Put(':boardId')
  async updateBoard(
    @Param('boardId') boardId: string,
    @Body() boardDto: BoardDto,
  ): Promise<Board> {
    const board: Board | undefined = await this.boardService.updateBoard(
      boardId,
      boardDto,
    );

    if (!board) {
      throw new NotFoundException('Board not found');
    }

    return board;
  }

  @Delete(':boardId')
  @HttpCode(STATUS_CODES.NO_CONTENT)
  async removeBoardUser(@Param('boardId') boardId: string): Promise<void> {
    const deleteResult: DeleteResult = await this.boardService.removeBoard(
      boardId,
    );

    if (!deleteResult.affected) {
      throw new NotFoundException('Board not found');
    }

    return;
  }
}
