import { RequestHandler } from 'express';
import { container } from 'tsyringe';

import { ResetUserPasswordUseCase } from './ResetUserPasswordUseCase';

export class ResetUserPasswordHandler {
  handle: RequestHandler = async (request, response) => {
    const { token, password } = request.body;

    const resetUserPasswordUseCase = container.resolve(ResetUserPasswordUseCase);

    await resetUserPasswordUseCase.execute({
      token,
      password,
    });

    return response.send();
  };
}
