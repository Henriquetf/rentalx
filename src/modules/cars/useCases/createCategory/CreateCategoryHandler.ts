import { RequestHandler } from 'express';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

export class CreateCategoryHandler {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

  handle: RequestHandler = async (request, response) => {
    const { name, description } = request.body;

    const category = await this.createCategoryUseCase.execute({
      name,
      description,
    });

    return response.status(201).json(category);
  };
}
