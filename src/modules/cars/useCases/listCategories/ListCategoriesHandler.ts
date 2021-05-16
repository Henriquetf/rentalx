import { RequestHandler } from 'express';

import { ListCategoriesUseCase } from './ListCategoriesUseCase';

export class ListCategoriesHandler {
  constructor(private listCategoriesUseCase: ListCategoriesUseCase) {}

  handle: RequestHandler = async (request, response) => {
    const categories = await this.listCategoriesUseCase.execute();

    return response.status(200).json(categories);
  };
}
