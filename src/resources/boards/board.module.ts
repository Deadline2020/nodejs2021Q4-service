import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { Board } from './board.model';
import { ColumnModule } from '../columns/column.module';
import { LoggerService } from '../../logger/logger.service';

@Module({
  imports: [TypeOrmModule.forFeature([Board]), ColumnModule],
  providers: [BoardService, LoggerService],
  controllers: [BoardController],
  exports: [BoardService],
})
export class BoardModule {}
