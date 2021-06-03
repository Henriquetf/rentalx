import { sign, verify } from 'jsonwebtoken';

import { inject, injectable } from 'tsyringe';

import { authConfig } from '@config/auth';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { AppError } from '@shared/errors/AppError';
import { IDateProvider } from '@shared/providers/DateProvider/IDateProvider';

interface IPayload {
  sub: string;
  email: string;
}

@injectable()
export class RefreshTokenUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute(token: string): Promise<string> {
    const payload = verify(token, authConfig.refresh_token.secret) as IPayload;

    const { sub: user_id, email } = payload;

    const userToken = await this.usersTokensRepository.findByRefreshTokenAndUser(token, user_id);

    if (!userToken) {
      throw new AppError('Refresh token does not exist.');
    }

    await this.usersTokensRepository.deleteById(userToken.id);

    const refresh_token = sign(
      {
        email,
      },
      authConfig.refresh_token.secret,
      {
        subject: user_id,
        expiresIn: authConfig.refresh_token.expires_in,
      },
    );

    const expiration_date = this.dateProvider.addDays(authConfig.refresh_token.expires_in_days);

    await this.usersTokensRepository.create({
      user_id,
      expiration_date,
      refresh_token,
    });

    return refresh_token;
  }
}
