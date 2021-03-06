import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { CreateUserUseCase } from '@modules/accounts/useCases/createUser/CreateUserUseCase';
import { AppError } from '@shared/errors/AppError';

import { IDateProvider } from '@shared/providers/DateProvider/IDateProvider';
import { DayjsDateProvider } from '@shared/providers/DateProvider/implementations/DayjsDateProvider';

import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

describe('Authenticate User', () => {
  let usersRepository: IUsersRepository;
  let usersTokensRepository: IUsersTokensRepository;
  let authenticateUserUseCase: AuthenticateUserUseCase;
  let createUserUseCase: CreateUserUseCase;
  let dateProvider: IDateProvider;

  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    usersTokensRepository = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepository,
      usersTokensRepository,
      dateProvider,
    );
    createUserUseCase = new CreateUserUseCase(usersRepository);
  });

  it('should be able to authentication an user', async () => {
    const user: ICreateUserDTO = {
      driver_license: '123456',
      email: 'user@test.com',
      name: 'test_user',
      password: '123456',
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
    expect(result).toHaveProperty('user');
  });

  it('should not be able to authenticate a nonexistent user', async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'invalid-user-email@test.com',
        password: 'invalid-user-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with an iuncorrect password', async () => {
    const user: ICreateUserDTO = {
      driver_license: '123456',
      email: 'user@test.com',
      name: 'test_user',
      password: '123456',
    };

    await createUserUseCase.execute(user);

    await expect(
      authenticateUserUseCase.execute({
        email: user.password,
        password: 'invalid-user-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
