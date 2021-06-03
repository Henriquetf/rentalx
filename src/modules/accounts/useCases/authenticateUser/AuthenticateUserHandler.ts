import { RequestHandler } from 'express';
import { container } from 'tsyringe';

import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

export class AuthenticateUserHandler {
  handle: RequestHandler = async (request, response) => {
    const { email, password } = request.body;

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    const { user, token, refresh_token } = await authenticateUserUseCase.execute({
      email,
      password,
    });

    return response.json({
      user,
      token,
      refresh_token,
    });
  };
}
