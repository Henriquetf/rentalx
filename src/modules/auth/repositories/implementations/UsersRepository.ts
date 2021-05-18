import { getRepository, Repository } from 'typeorm';

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  findById(id: string): Promise<User | undefined> {
    return this.repository.findOne({
      where: { id },
    });
  }

  findByEmail(email: string): Promise<User | undefined> {
    return this.repository.findOne({
      where: { email },
    });
  }

  async create(params: ICreateUserDTO): Promise<User> {
    const user = this.repository.create(params);

    await this.repository.save(user);

    return user;
  }
}
