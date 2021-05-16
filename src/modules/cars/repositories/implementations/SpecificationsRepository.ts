import { getRepository, Repository } from 'typeorm';

import { Specification } from '../../entities/Specification';
import { ISpecificationsRepository, ICreateSpecificationDTO } from '../ISpecificationsRepository';

export class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async findByName(name: string): Promise<Specification | undefined> {
    const specification = await this.repository.findOne({
      where: { name },
    });

    return specification;
  }

  async create(params: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.repository.create(params);

    await this.repository.save(specification);

    return specification;
  }
}
