import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';
import { ImportCategoryHandler } from './ImportCategoryHandler';
import { ImportCategoryUseCase } from './ImportCategoryUseCase';

const categoriesRepository = CategoriesRepository.getInstance();
const importCategoryUseCase = new ImportCategoryUseCase(categoriesRepository);

export const importCategoryHandler = new ImportCategoryHandler(importCategoryUseCase);
