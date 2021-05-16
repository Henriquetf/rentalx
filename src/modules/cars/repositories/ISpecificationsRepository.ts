import { Specification } from '../entities/Specification';

export interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

export interface ISpecificationRepository {
  create(params: ICreateSpecificationDTO): Specification;
  findByName(name: string): Specification | undefined;
}
