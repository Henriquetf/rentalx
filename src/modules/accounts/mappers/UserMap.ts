import { classToClass } from 'class-transformer';

import { IUserReponseDTO } from '../dtos/IUserReponseDTO';
import { User } from '../infra/typeorm/entities/User';

export class UserMap {
  static toDTO({ id, name, email, avatar, driver_license, avatar_url }: User): IUserReponseDTO {
    const user = classToClass({
      id,
      name,
      email,
      avatar,
      driver_license,
      avatar_url,
    });

    return user;
  }
}
