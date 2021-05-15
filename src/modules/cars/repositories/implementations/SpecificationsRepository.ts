import { Specification } from '../../model/Specification';
import { ISpecificationRepository, ICreateSpecificationDTO } from '../ISpecificationsRepository';

export class SpecificationsRepository implements ISpecificationRepository {
  private specifications: Specification[];

  private constructor() {
    this.specifications = [];
  }

  findByName(name: string): Specification | undefined {
    const specification = this.specifications.find((c) => c.name === name);

    return specification;
  }

  create(params: ICreateSpecificationDTO): Specification {
    const specification = new Specification(params);

    this.specifications.push(specification);

    return specification;
  }

  private static instance: SpecificationsRepository;

  static getInstance(): SpecificationsRepository {
    if (!this.instance) {
      this.instance = new SpecificationsRepository();
    }

    return this.instance;
  }
}
