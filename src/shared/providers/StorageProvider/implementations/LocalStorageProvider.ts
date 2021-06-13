import fs from 'fs';

import { getStoragePath, getTempStoragePath } from '@config/upload';

import { deleteFile } from '@shared/utils/file';

import { IStorageProvider } from '../IStorageProvider';

export class LocalStorageProvider implements IStorageProvider {
  async save(file: string, folder: string): Promise<string> {
    const oldPath = getTempStoragePath(folder, file);
    const newPath = getStoragePath(folder, file);

    await fs.promises.rename(oldPath, newPath);

    return file;
  }

  async delete(file: string, folder: string): Promise<void> {
    const filepath = getStoragePath(folder, file);

    await deleteFile(filepath);
  }
}
