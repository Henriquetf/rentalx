import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';
import { CreateCategoryHandler } from './CreateCategoryHandler';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

export function makeCreateCategoryHandler(): CreateCategoryHandler {
  const categoriesRepository = new CategoriesRepository();
  const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);

  return new CreateCategoryHandler(createCategoryUseCase);
}
