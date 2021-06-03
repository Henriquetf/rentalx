import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';

import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';

import { AppError } from '@shared/errors/AppError';
import { IDateProvider } from '@shared/providers/DateProvider/IDateProvider';
import { DayjsDateProvider } from '@shared/providers/DateProvider/implementations/DayjsDateProvider';

import { IMailProvider } from '@shared/providers/MailProvider/IMailProvider';
import { MailProviderInMemory } from '@shared/providers/MailProvider/in-memory/MailProviderInMemory';

import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

describe('Send Forgot Password Mail', () => {
  let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
  let usersRepository: IUsersRepository;
  let usersTokensRepository: IUsersTokensRepository;
  let dateProvider: IDateProvider;
  let mailProvider: IMailProvider;

  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    usersTokensRepository = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepository,
      usersTokensRepository,
      dateProvider,
      mailProvider,
    );
  });

  it('should be able to send a forgot password mail to user', async () => {
    const sendMail = spyOn(mailProvider, 'sendMail');

    const userEmail = 'reset@rentalx.com';

    await usersRepository.create({
      name: 'Reset user',
      driver_license: '001122',
      email: userEmail,
      password: '123456',
    });

    await sendForgotPasswordMailUseCase.execute(userEmail);

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to send an email if user does not exist', async () => {
    const sendMail = spyOn(mailProvider, 'sendMail');

    await expect(
      sendForgotPasswordMailUseCase.execute('unknown.jello@rentalx.com'),
    ).rejects.toBeInstanceOf(AppError);

    expect(sendMail).not.toHaveBeenCalled();
  });

  it('should be able to create a reset token', async () => {
    const createToken = spyOn(usersTokensRepository, 'create');

    const userEmail = 'reset@rentalx.com';

    await usersRepository.create({
      name: 'Reset user',
      driver_license: '001122',
      email: userEmail,
      password: '123456',
    });

    await sendForgotPasswordMailUseCase.execute(userEmail);

    expect(createToken).toHaveBeenCalled();
  });
});
