import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { ICreateUserDTO } from '@modules/auth/dtos/ICreateUserDTO';
import { User } from '@modules/auth/entities/User';
import { IUsersRepository } from '@modules/auth/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(params: ICreateUserDTO): Promise<User> {
    const userAlreadyExists = await this.usersRepository.findByEmail(params.email);

    if (userAlreadyExists) {
      throw new AppError('User already exists');
    }

    const passwordHash = await hash(params.password, 8);

    const user = await this.usersRepository.create({
      ...params,
      password: passwordHash,
    });

    return user;
  }
}
