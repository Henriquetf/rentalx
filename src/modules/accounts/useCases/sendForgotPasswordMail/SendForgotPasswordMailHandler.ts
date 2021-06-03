import { RequestHandler } from 'express';
import { container } from 'tsyringe';

import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

export class SendForgotPasswordMailHandler {
  handle: RequestHandler = async (request, response) => {
    const { email } = request.body;

    const sendForgotPasswordMailUseCase = container.resolve(SendForgotPasswordMailUseCase);

    await sendForgotPasswordMailUseCase.execute(email);

    return response.send();
  };
}
