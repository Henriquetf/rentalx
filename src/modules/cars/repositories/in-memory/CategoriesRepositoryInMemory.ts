/* eslint-disable @typescript-eslint/require-await */

import { ICreateCategoryDTO } from '@modules/cars/dtos/ICreateCategoryDTO';
import { Category } from '@modules/cars/infra/typeorm/entities/Category';

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
