import crypto from 'crypto';
import path from 'path';

import multer from 'multer';

export function getStoragePath(...filepath: string[]): string {
  return path.resolve(__dirname, '..', '..', 'storage', ...filepath);
}

export function getTempStoragePath(...filepath: string[]): string {
  return getStoragePath('tmp', ...filepath);
}

export function makeUploadStorage(filepath: string): multer.Options {
  return {
    storage: multer.diskStorage({
      destination: getTempStoragePath(filepath),
      filename: (_, file, callback) => {
        const fileHash = crypto.randomBytes(16).toString('hex');
        const fileName = `${fileHash}-${file.originalname}`;

        return callback(null, fileName);
      },
    }),
  };
}
