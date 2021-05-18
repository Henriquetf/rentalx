import { RequestHandler } from 'express';
import { container } from 'tsyringe';

import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';

export class CreateSpecificationHandler {
  handle: RequestHandler = async (request, response) => {
    const { name, description } = request.body;

    const createSpecificationUseCase = container.resolve(CreateSpecificationUseCase);

    const specification = await createSpecificationUseCase.execute({
      name,
      description,
    });

    return response.status(201).json(specification);
  };
}
