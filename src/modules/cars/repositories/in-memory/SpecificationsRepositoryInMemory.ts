/* eslint-disable @typescript-eslint/require-await */
import { ICreateSpecificationDTO } from '@modules/cars/dtos/ICreateSpecificationDTO';
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';

import { ISpecificationsRepository } from '../ISpecificationsRepository';

export class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
  private specifications: Specification[] = [];

  async create(params: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, params, {
      id: params.name,
    });

    this.specifications.push(specification);

    return specification;
  }

  async findByName(name: string): Promise<Specification | undefined> {
    return this.specifications.find((s) => s.name === name);
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    return this.specifications.filter((s) => ids.includes(s.id));
  }
}
