import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { authConfig } from '@config/auth';
import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { AppError } from '@shared/errors/AppError';
import { IDateProvider } from '@shared/providers/DateProvider/IDateProvider';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: Pick<User, 'name' | 'email'>;
  token: string;
  refresh_token: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email or password is invalid');
    }

    const passwordMatches = await compare(password, user.password);

    if (!passwordMatches) {
      throw new AppError('Email or password is invalid');
    }

    const token = sign({}, authConfig.access_token.secret, {
      subject: user.id,
      expiresIn: authConfig.access_token.expires_in,
    });

    const refresh_token = sign(
      {
        email: user.email,
      },
      authConfig.refresh_token.secret,
      {
        subject: user.id,
        expiresIn: authConfig.refresh_token.expires_in,
      },
    );

    const expiration_date = this.dateProvider.addDays(authConfig.refresh_token.expires_in_days);

    await this.usersTokensRepository.create({
      user_id: user.id,
      expiration_date,
      refresh_token,
    });

    return {
      user: {
        email: user.email,
        name: user.name,
      },
      token,
      refresh_token,
    };
  }
}
