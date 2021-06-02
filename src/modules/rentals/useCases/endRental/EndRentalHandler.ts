import { RequestHandler } from 'express';
import { container } from 'tsyringe';

import { EndRentalUseCase } from './EndRentalUseCase';

export class EndRentalHandler {
  handle: RequestHandler = async (request, response) => {
    const { id: rental_id } = request.params;
    const { id: user_id } = request.user;

    const endRentalUseCase = container.resolve(EndRentalUseCase);

    const rental = await endRentalUseCase.execute({
      rental_id,
      user_id,
    });

    return response.json(rental);
  };
}
