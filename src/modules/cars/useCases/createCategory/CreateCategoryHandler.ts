import { RequestHandler } from 'express';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

export class CreateCategoryHandler {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

  handle: RequestHandler = (request, response) => {
    const { name, description } = request.body;

    const category = this.createCategoryUseCase.execute({
      name,
      description,
    });

    return response.status(201).json(category);
  };
}
