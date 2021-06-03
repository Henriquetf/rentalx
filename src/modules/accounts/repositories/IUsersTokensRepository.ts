import { ICreateUserTokenDTO } from '../dtos/ICreateUserTokenDTO';
import { UserToken } from '../infra/typeorm/entities/UserToken';

export interface IUsersTokensRepository {
  create(params: ICreateUserTokenDTO): Promise<UserToken>;
  findByRefreshTokenAndUser(refresh_token: string, user_id: string): Promise<UserToken | undefined>;
  findByRefreshToken(refresh_token: string): Promise<UserToken | undefined>;
  deleteById(id: string): Promise<void>;
}
