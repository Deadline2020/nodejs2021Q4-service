import {
  Controller,
  Get,
  Post,
  Param,
  UseInterceptors,
  UploadedFile,
  StreamableFile,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileFastifyInterceptor } from 'fastify-file-interceptor';
import { diskStorage } from 'multer';
import { ReadStream } from 'fs';

import config from 'src/common/config';
import { FileService } from './file.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(
    config.USE_FASTIFY === 'true'
      ? FileFastifyInterceptor('file', {
          storage: diskStorage({
            destination: './storage',
            filename: (_, file, callback) => {
              callback(null, `${Date.now()}.${file.originalname}`);
            },
          }),
        })
      : FileInterceptor('file', {
          storage: diskStorage({
            destination: './storage',
            filename: (_, file, callback) => {
              callback(null, `${Date.now()}.${file.originalname}`);
            },
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
