import {
  Controller,
  Get,
  Post,
  Param,
  UseInterceptors,
  UploadedFile,
  StreamableFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileFastifyInterceptor } from 'fastify-file-interceptor';
import { diskStorage } from 'multer';
import { createReadStream, ReadStream } from 'fs';
import { join } from 'path';

import { getStorageFileName } from './file.utils';
import config from 'src/common/config';

@Controller('file')
export class FileController {
  constructor() {}

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
        }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      filename: file.filename,
    };
  }

  @Get(':filename')
  downloadFile(@Param('filename') filename: string): StreamableFile {
    const stream: ReadStream = createReadStream(
      join(process.cwd(), 'storage', filename),
    );
    return new StreamableFile(stream);
  }
}
