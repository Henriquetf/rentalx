import { getRepository, Repository } from 'typeorm';

import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';

import { UserToken } from '../entities/UserToken';

export class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserToken>;

  constructor() {
    this.repository = getRepository(UserToken);
  }

  async create(params: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = this.repository.create(params);

    await this.repository.save(userToken);

    return userToken;
  }

  async findByRefreshTokenAndUser(
    refresh_token: string,
    user_id: string,
  ): Promise<UserToken | undefined> {
    const usersTokens = await this.repository.findOne({
      where: {
        user_id,
        refresh_token,
      },
    });

    return usersTokens;
  }

  async findByRefreshToken(refresh_token: string): Promise<UserToken | undefined> {
    const userToken = await this.repository.findOne({
      where: {
        refresh_token,
      },
    });

    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete({
      id,
    });
  }
}
