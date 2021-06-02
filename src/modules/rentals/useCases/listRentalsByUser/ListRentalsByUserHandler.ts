import { RequestHandler } from 'express';
import { container } from 'tsyringe';

import { ListRentalsByUserUseCase } from './ListRentalsByUserUseCase';

export class ListRentalsByUserHandler {
  handle: RequestHandler = async (request, response) => {
    const { id: user_id } = request.user;
    const listRentalsByUserUseCase = container.resolve(ListRentalsByUserUseCase);

    const rentals = await listRentalsByUserUseCase.execute(user_id);

    return response.json(rentals);
  };
}
