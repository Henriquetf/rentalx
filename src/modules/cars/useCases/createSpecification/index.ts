import { SpecificationsRepository } from '../../repositories/implementations/SpecificationsRepository';
import { CreateSpecificationHandler } from './CreateSpecificationHandler';
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';

const specificationsRepository = SpecificationsRepository.getInstance();
const createSpecificationUseCase = new CreateSpecificationUseCase(specificationsRepository);

export const createSpecificationHandler = new CreateSpecificationHandler(
  createSpecificationUseCase,
);
