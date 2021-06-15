import { container } from 'tsyringe';

import { IMailProvider } from './IMailProvider';
import { EtherealMailProvider } from './implementations/EtherealMailProvider';
import { SESMailProvider } from './implementations/SESMailProvider';
import { TestAccountClient } from './implementations/TestAccountClient';

const mailService = {
  ethereal: EtherealMailProvider,
  ses: SESMailProvider,
};

const envMail = process.env.MAIL_PROVIDER as keyof typeof mailService;
const mailProvider = mailService[envMail] ?? mailService.ethereal;

container.registerSingleton<TestAccountClient>('AccountClient', TestAccountClient);
container.registerSingleton<IMailProvider>('MailProvider', mailProvider);
