import { RequestHandler } from 'express';
import { container } from 'tsyringe';

import { CreateCarUseCase } from './CreateCarUseCase';

export class CreateCarHandler {
  handle: RequestHandler = async (request, response) => {
    const params = request.body;

    const createCarUseCase = container.resolve(CreateCarUseCase);

    const car = await createCarUseCase.execute(params);

    return response.status(201).json(car);
  };
}
