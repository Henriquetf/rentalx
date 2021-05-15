import { RequestHandler } from 'express';

import { ImportCategoryUseCase } from './ImportCategoryUseCase';

export class ImportCategoryHandler {
  constructor(private importCategoryUseCase: ImportCategoryUseCase) {}

  handle: RequestHandler = async (request, response) => {
    const { file } = request;

    await this.importCategoryUseCase.execute(file);

    return response.send();
  };
}
