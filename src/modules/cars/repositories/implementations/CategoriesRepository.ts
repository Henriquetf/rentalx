import { getRepository, Repository } from 'typeorm';

import { Category } from '../../entities/Category';
import { ICategoriesRepository, ICreateCategoryDTO } from '../ICategoriesRepository';

export class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create(params: ICreateCategoryDTO): Promise<Category> {
    const category = this.repository.create(params);

    await this.repository.save(category);

    return category;
  }

  list(): Promise<Category[]> {
    return this.repository.find();
  }

  findByName(name: string): Promise<Category | undefined> {
    return this.repository.findOne({
      where: { name },
    });
  }

  // private static instance: CategoriesRepository;

  // static getInstance(): CategoriesRepository {
  //   if (!this.instance) {
  //     this.instance = new CategoriesRepository();
  //   }

  //   return this.instance;
  // }
}
