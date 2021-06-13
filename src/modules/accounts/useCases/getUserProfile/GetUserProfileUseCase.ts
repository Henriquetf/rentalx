import { inject, injectable } from 'tsyringe';

import { IUserReponseDTO } from '@modules/accounts/dtos/IUserReponseDTO';
import { UserMap } from '@modules/accounts/mappers/UserMap';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
export class GetUserProfileUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(id: string): Promise<IUserReponseDTO> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User does not exist.');
    }

    return UserMap.toDTO(user);
  }
}
