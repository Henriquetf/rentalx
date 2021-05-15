import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';
import { CreateCategoryHandler } from './CreateCategoryHandler';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

const categoriesRepository = CategoriesRepository.getInstance();
const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);

export const createCategoryHandler = new CreateCategoryHandler(createCategoryUseCase);
