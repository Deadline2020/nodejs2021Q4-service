import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Col } from './column.model';
import { ColumnService } from './column.service';

@Module({
  imports: [TypeOrmModule.forFeature([Col])],
  providers: [ColumnService],
  controllers: [],
  exports: [ColumnService],
})
export class ColumnModule {}
