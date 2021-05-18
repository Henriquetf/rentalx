import { inject, injectable } from 'tsyringe';

import { getStoragePath } from '../../../../config/upload';

import { deleteFile } from '../../../../utils/file';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  avatar_file: string;
}

@injectable()
export class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ avatar_file, user_id }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      return;
    }

    if (user.avatar) {
      await deleteFile(getStoragePath('avatars', user.avatar));
    }

    user.avatar = avatar_file;

    await this.usersRepository.update(user);
  }
}
