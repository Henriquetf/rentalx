/* eslint-disable @typescript-eslint/require-await */

import { ICreateUserDTO, IUpdateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { User } from '@modules/accounts/infra/typeorm/entities/User';

import { IUsersRepository } from '../IUsersRepository';

export class UsersRepositoryInMemory implements IUsersRepository {
  private users: User[] = [];

  async create(params: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, params, {
      id: params.name,
    });

    this.users.push(user);

    return user;
  }

  async update(params: IUpdateUserDTO): Promise<User> {
    const userIndex = this.users.findIndex((u) => u.id === params.id);

    if (userIndex === -1) {
      throw new Error('User not found');
    }

    const user = {
      ...this.users[userIndex],
      ...params,
    };

    this.users[userIndex] = user;

    return user;
  }

  async findById(id: string): Promise<User | undefined> {
    return this.users.find((u) => u.id === id);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((u) => u.email === email);
  }
}
