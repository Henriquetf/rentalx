/* eslint-disable @typescript-eslint/require-await */

import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO';
import { UserToken } from '@modules/accounts/infra/typeorm/entities/UserToken';

import { IUsersTokensRepository } from '../IUsersTokensRepository';

export class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  private tokens: UserToken[] = [];

  async create(params: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, params, {
      id: params.refresh_token,
    });

    this.tokens.push(userToken);

    return userToken;
  }

  async findByRefreshTokenAndUser(
    refresh_token: string,
    user_id: string,
  ): Promise<UserToken | undefined> {
    return this.tokens.find((t) => t.refresh_token === refresh_token && t.user_id === user_id);
  }

  async findByRefreshToken(refresh_token: string): Promise<UserToken | undefined> {
    return this.tokens.find((t) => t.refresh_token === refresh_token);
  }

  async deleteById(id: string): Promise<void> {
    this.tokens = this.tokens.filter((t) => t.id !== id);
  }
}
