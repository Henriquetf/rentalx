import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';

import { User } from '../../entities/User';

import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: Pick<User, 'name' | 'email'>;
  token: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
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

    const token = sign(
      {},
      't8lLDIAkCBxBNy2tPgNybIkE/V1omdPkab0csXTI2efqFTXdeIh70WFPfDuKK7RmC1ZP7j0jRJHbT4ex7FTeOotjYzwA0xQT60Np0jT5OvqV4g0yL/GCCBTJsOPVuTC7Cm6DKjE+APT05oskb1PLAXgvI92NWT3S9dZP51v87fQD/s4JHRzbsq/uqgm6tWH7BrMuxVSlLDLH8SI0rlp3ef89/zyAT2IUSiDw0Q==%',
      {
        subject: user.id,
        expiresIn: '1d',
      },
    );

    return {
      user: {
        email: user.email,
        name: user.name,
      },
      token,
    };
  }
}
