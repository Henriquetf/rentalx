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
    throw new Error('Method not implemented.');
  }

  async findById(id: string): Promise<User | undefined> {
    return this.users.find((u) => u.id === id);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((u) => u.email === email);
  }
}
