import { RequestHandler } from 'express';
import { container } from 'tsyringe';

import { GetUserProfileUseCase } from './GetUserProfileUseCase';

export class GetUserProfileHandler {
  handle: RequestHandler = async (request, response) => {
    const { id } = request.user;

    const getUserProfileUseCase = container.resolve(GetUserProfileUseCase);

    const user = await getUserProfileUseCase.execute(id);

    return response.json(user);
  };
}
