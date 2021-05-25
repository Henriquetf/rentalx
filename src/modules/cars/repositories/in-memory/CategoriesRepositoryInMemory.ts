import { ICreateCategoryDTO } from '../../dtos/ICreateCategoryDTO';
import { Category } from '../../entities/Category';
import { ICategoriesRepository } from '../ICategoriesRepository';

export class CategoriesRepositoryInMemory implements ICategoriesRepository {
  private categories: Category[] = [];

  async findByName(name: string): Promise<Category | undefined> {
    return this.categories.find((c) => c.name === name);
  }

  async list(): Promise<Category[]> {
    return this.categories;
  }

  async create(params: ICreateCategoryDTO): Promise<Category> {
    const category = new Category();

    Object.assign(category, params, {
      id: params.name,
    });

    this.categories.push(category);

    return category;
  }
}
