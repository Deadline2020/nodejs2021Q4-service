import { Module } from '@nestjs/common';

import { LoggerService } from '../../logger/logger.service';
import { FileController } from './file.controller';
import { FileService } from './file.service';

@Module({
  controllers: [FileController],
  providers: [FileService, LoggerService],
})
export class FileModule {}
