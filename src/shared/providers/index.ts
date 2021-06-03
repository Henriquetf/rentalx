import { container } from 'tsyringe';

import { IDateProvider } from './DateProvider/IDateProvider';
import { DayjsDateProvider } from './DateProvider/implementations/DayjsDateProvider';
import { IMailProvider } from './MailProvider/IMailProvider';
import { EtherealMailProvider } from './MailProvider/implementations/EtherealMailProvider';
import { TestAccountClient } from './MailProvider/implementations/TestAccountClient';

container.registerSingleton<IDateProvider>('DateProvider', DayjsDateProvider);
container.registerSingleton<TestAccountClient>('AccountClient', TestAccountClient);
container.registerSingleton<IMailProvider>('MailProvider', EtherealMailProvider);
