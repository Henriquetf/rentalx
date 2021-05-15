import { Router } from 'express';

import { createCategoryHandler } from '../modules/cars/useCases/createCategory';
import { listCategoriesHandler } from '../modules/cars/useCases/listCategories';

export const categoriesRoutes = Router();

categoriesRoutes.post('/', createCategoryHandler.handle);
categoriesRoutes.get('/', listCategoriesHandler.handler);
