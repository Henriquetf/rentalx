import { RequestHandler } from 'express';
import { container } from 'tsyringe';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

export class CreateCarSpecificationHandler {
  handle: RequestHandler = async (request, response) => {
    const { id: car_id } = request.params;
    const { specifications_id } = request.body;

    const createCarSpecificationUseCase = container.resolve(CreateCarSpecificationUseCase);

    const car = await createCarSpecificationUseCase.execute({
      car_id,
      specifications_id,
    });

    return response.json(car);
  };
}
