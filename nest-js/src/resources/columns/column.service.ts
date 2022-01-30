import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Col } from './column.model';
import { ColumnDto } from './column.dto';

@Injectable()
export class ColumnService {
  constructor(
    @InjectRepository(Col)
    private columnRepo: Repository<Col>,
  ) {}

  async addColumn(columnDto: ColumnDto): Promise<Col> {
    const newColumn: Col = this.columnRepo.create(columnDto);
    return await this.columnRepo.save(newColumn);
  }
}
