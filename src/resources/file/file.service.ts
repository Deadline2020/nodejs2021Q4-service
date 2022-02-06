import { Injectable } from '@nestjs/common';
import { createReadStream, existsSync, ReadStream } from 'fs';
import { join } from 'path';

@Injectable()
export class FileService {
  getStream(filename: string): ReadStream | undefined {
    const filePath: string = join(process.cwd(), 'storage', filename);

    if (existsSync(filePath)) {
      return createReadStream(filePath);
    }

    return undefined;
  }
}
