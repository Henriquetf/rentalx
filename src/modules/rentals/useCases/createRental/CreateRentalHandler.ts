import { RequestHandler } from 'express';
import { container } from 'tsyringe';

import { CreateRentalUseCase } from './CreateRentalUseCase';

export class CreateRentalHandler {
  handle: RequestHandler = async (request, response) => {
    const { user } = request;
    const { car_id, expected_return_date } = request.body;

    const createRentalUseCase = container.resolve(CreateRentalUseCase);

    const rental = await createRentalUseCase.execute({
      car_id,
      expected_return_date,
      user_id: user.id,
    });

    return response.status(201).json(rental);
  };
}
