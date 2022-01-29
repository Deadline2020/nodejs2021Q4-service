import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Col } from './column.model';

@Module({
  imports: [TypeOrmModule.forFeature([Col])],
})
export class ColumnModule {}
