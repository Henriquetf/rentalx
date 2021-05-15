import { Category } from '../../model/Category';
import { ICategoriesRepository, ICreateCategoryDTO } from '../ICategoriesRepository';

export class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[];

  private constructor() {
    this.categories = [];
  }

  create(params: ICreateCategoryDTO): Category {
    const category = new Category(params);

    this.categories.push(category);

    return category;
  }

  list(): Category[] {
    return this.categories;
  }

  findByName(name: string): Category | undefined {
    const category = this.categories.find((c) => c.name === name);

    return category;
  }

  private static instance: CategoriesRepository;

  static getInstance(): CategoriesRepository {
    if (!this.instance) {
      this.instance = new CategoriesRepository();
    }

    return this.instance;
  }
}
