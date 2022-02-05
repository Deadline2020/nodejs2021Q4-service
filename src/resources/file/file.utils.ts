import { Request } from 'express';

export const getStorageFileName = (
  _: Request,
  file: Express.Multer.File,
  callback: (error: Error | null, filename: string) => void
) => {
  callback(null, `${Date.now()}.${file.originalname}`);
};
