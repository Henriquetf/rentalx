import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { IStorageProvider } from '@shared/providers/StorageProvider/IStorageProvider';

interface IRequest {
  user_id: string;
  avatar_file: string;
}

@injectable()
export class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  async execute({ avatar_file, user_id }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exist.');
    }

    await this.storageProvider.save(avatar_file, 'avatars');

    if (user.avatar) {
      await this.storageProvider.delete(user.avatar, 'avatars');
    }

    user.avatar = avatar_file;

    await this.usersRepository.update(user);
  }
}
