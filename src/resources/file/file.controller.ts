import {
  Controller,
  Get,
  Post,
  Param,
  UseInterceptors,
  UploadedFile,
  StreamableFile,
  NotFoundException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileFastifyInterceptor } from 'fastify-file-interceptor';
import { diskStorage } from 'multer';
import { ReadStream } from 'fs';

import { getStorageFileName } from './file.utils';
import config from 'src/common/config';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @UseInterceptors(
    config.USE_FASTIFY === 'true'
      ? FileFastifyInterceptor('file', {
          storage: diskStorage({
            destination: './storage',
            filename: getStorageFileName,
          }),
        })
      : FileInterceptor('file', {
          storage: diskStorage({
            destination: './storage',
            filename: getStorageFileName,
          }),
        })
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      filename: file.filename,
    };
  }

  @Get(':filename')
  downloadFile(@Param('filename') filename: string): StreamableFile {
    const stream: ReadStream | undefined = this.fileService.getStream(filename);

    if (!stream) {
      throw new NotFoundException('File not found');
    }
    return new StreamableFile(stream);
  }
}
