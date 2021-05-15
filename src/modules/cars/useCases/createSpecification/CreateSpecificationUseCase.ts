import { Specification } from '../../model/Specification';
import { ISpecificationRepository } from '../../repositories/ISpecificationsRepository';

interface IRequest {
  name: string;
  description: string;
}

export class CreateSpecificationUseCase {
  constructor(private specificationsRepository: ISpecificationRepository) {}

  execute({ name, description }: IRequest): Specification {
    const specificationAlreadyExists = this.specificationsRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new Error('Category already exists.');
    }

    const specification = this.specificationsRepository.create({
      description,
      name,
    });

    return specification;
  }
}
