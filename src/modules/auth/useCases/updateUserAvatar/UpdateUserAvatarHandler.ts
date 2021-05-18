import { RequestHandler } from 'express';
import { container } from 'tsyringe';

import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase';

export class UpdateUserAvatarHandler {
  handle: RequestHandler = async (request, response) => {
    const { id } = request.user;
    const avatar_file = request.file.filename;

    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

    await updateUserAvatarUseCase.execute({
      avatar_file,
      user_id: id,
    });

    return response.status(204).send();
  };
}
