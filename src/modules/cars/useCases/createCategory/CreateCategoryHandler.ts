import { RequestHandler } from 'express';
import { container } from 'tsyringe';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

export class CreateCategoryHandler {
  handle: RequestHandler = async (request, response) => {
    const { name, description } = request.body;

    const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

    const category = await createCategoryUseCase.execute({
      name,
      description,
    });

    return response.status(201).json(category);
  };
}
