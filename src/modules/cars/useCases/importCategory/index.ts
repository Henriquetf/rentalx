import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';
import { ImportCategoryHandler } from './ImportCategoryHandler';
import { ImportCategoryUseCase } from './ImportCategoryUseCase';

export function makeImportCategoryHandler(): ImportCategoryHandler {
  const categoriesRepository = new CategoriesRepository();
  const importCategoryUseCase = new ImportCategoryUseCase(categoriesRepository);

  return new ImportCategoryHandler(importCategoryUseCase);
}
