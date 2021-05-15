import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';
import { ListCategoriesHandler } from './ListCategoriesHandler';
import { ListCategoriesUseCase } from './ListCategoriesUseCase';

const categoriesRepository = CategoriesRepository.getInstance();
const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository);

export const listCategoriesHandler = new ListCategoriesHandler(listCategoriesUseCase);
