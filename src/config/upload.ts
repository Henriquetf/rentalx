import crypto from 'crypto';
import path from 'path';

import multer from 'multer';

export function getStoragePath(...folder: string[]): string {
  return path.resolve(__dirname, '..', '..', 'storage', ...folder);
}

export function makeUploadStorage(folder: string): multer.Options {
  return {
    storage: multer.diskStorage({
      destination: getStoragePath(folder),
      filename: (_, file, callback) => {
        const fileHash = crypto.randomBytes(16).toString('hex');
        const fileName = `${fileHash}-${file.originalname}`;

        return callback(null, fileName);
      },
    }),
  };
}
