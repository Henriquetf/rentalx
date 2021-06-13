import { container } from 'tsyringe';

import { IDateProvider } from './DateProvider/IDateProvider';
import { DayjsDateProvider } from './DateProvider/implementations/DayjsDateProvider';

import { IMailProvider } from './MailProvider/IMailProvider';
import { EtherealMailProvider } from './MailProvider/implementations/EtherealMailProvider';
import { TestAccountClient } from './MailProvider/implementations/TestAccountClient';

import { IStorageProvider } from './StorageProvider/IStorageProvider';
import { LocalStorageProvider } from './StorageProvider/implementations/LocalStorageProvider';
import { S3StorageProvider } from './StorageProvider/implementations/S3StorageProvider';

container.registerSingleton<IDateProvider>('DateProvider', DayjsDateProvider);
container.registerSingleton<TestAccountClient>('AccountClient', TestAccountClient);
container.registerSingleton<IMailProvider>('MailProvider', EtherealMailProvider);

const diskStorage = {
  local: LocalStorageProvider,
  S3: S3StorageProvider,
};

const envStorage = process.env.STORAGE_DISK as keyof typeof diskStorage;
const diskProvider = diskStorage[envStorage] ?? diskStorage.local;

container.registerSingleton<IStorageProvider>('StorageProvider', diskProvider);
