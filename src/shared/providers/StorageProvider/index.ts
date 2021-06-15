import { container } from 'tsyringe';

import { IStorageProvider } from './IStorageProvider';
import { LocalStorageProvider } from './implementations/LocalStorageProvider';
import { S3StorageProvider } from './implementations/S3StorageProvider';

const diskStorage = {
  local: LocalStorageProvider,
  S3: S3StorageProvider,
};

const envStorage = process.env.STORAGE_DISK as keyof typeof diskStorage;
const diskProvider = diskStorage[envStorage] ?? diskStorage.local;

container.registerSingleton<IStorageProvider>('StorageProvider', diskProvider);
