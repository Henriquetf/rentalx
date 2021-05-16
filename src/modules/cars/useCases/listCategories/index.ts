import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';
import { ListCategoriesHandler } from './ListCategoriesHandler';
import { ListCategoriesUseCase } from './ListCategoriesUseCase';

export function makeListCategoriesHandler(): ListCategoriesHandler {
  const categoriesRepository = new CategoriesRepository();
  const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository);

  return new ListCategoriesHandler(listCategoriesUseCase);
}
