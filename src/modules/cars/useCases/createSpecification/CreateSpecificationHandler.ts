import { RequestHandler } from 'express';

import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';

export class CreateSpecificationHandler {
  constructor(private createSpecificationUseCase: CreateSpecificationUseCase) {}

  handle: RequestHandler = (request, response) => {
    const { name, description } = request.body;

    const specification = this.createSpecificationUseCase.execute({
      name,
      description,
    });

    return response.status(201).send(specification);
  };
}
