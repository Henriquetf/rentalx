import { RequestHandler } from 'express';

import { ListCategoriesUseCase } from './ListCategoriesUseCase';

export class ListCategoriesHandler {
  constructor(private listCategoriesUseCase: ListCategoriesUseCase) {}

  handler: RequestHandler = (request, response) => {
    const categories = this.listCategoriesUseCase.execute();

    return response.status(201).json(categories);
  };
}
