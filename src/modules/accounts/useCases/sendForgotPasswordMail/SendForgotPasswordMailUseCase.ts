import { resolve } from 'path';

import { inject, injectable } from 'tsyringe';
import { v4 as uuidV4 } from 'uuid';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { AppError } from '@shared/errors/AppError';
import { IDateProvider } from '@shared/providers/DateProvider/IDateProvider';
import { IMailProvider } from '@shared/providers/MailProvider/IMailProvider';

const FORGOT_PASSWORD_TOKEN_EXPIRATION_TIME_IN_HOURS = 3;

@injectable()
export class SendForgotPasswordMailUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exist.');
    }

    const token = uuidV4();
    const expiration_date = this.dateProvider.addHours(
      FORGOT_PASSWORD_TOKEN_EXPIRATION_TIME_IN_HOURS,
    );

    await this.usersTokensRepository.create({
      user_id: user.id,
      expiration_date,
      refresh_token: token,
    });

    const forgotPasswordUrl = new URL(`${process.env.APP_URL || ''}/password/reset`);
    forgotPasswordUrl.searchParams.set('token', token);

    const templatePath = resolve(__dirname, '..', '..', 'views', 'emails', 'forgotPassword.hbs');
    const templateVariables = {
      name: user.name,
      link: forgotPasswordUrl,
    };

    await this.mailProvider.sendMail({
      to: email,
      subject: 'Reset password instructions',
      variables: templateVariables,
      template: templatePath,
    });
  }
}
