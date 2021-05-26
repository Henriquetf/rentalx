import { RequestHandler } from 'express';
import { container } from 'tsyringe';

import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserHandler {
  handle: RequestHandler = async (request, response) => {
    const { name, email, password, driver_license } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    const user = await createUserUseCase.execute({
      name,
      email,
      password,
      driver_license,
    });

    return response.status(201).json(user);
  };
}
