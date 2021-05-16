import path from 'path';

import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryHandler } from '../modules/cars/useCases/createCategory/CreateCategoryHandler';
import { ImportCategoryHandler } from '../modules/cars/useCases/importCategory/ImportCategoryHandler';
import { ListCategoriesHandler } from '../modules/cars/useCases/listCategories/ListCategoriesHandler';

const upload = multer({
  dest: path.resolve(__dirname, '..', '..', 'storage', 'tmp'),
});

export const categoriesRoutes = Router();

const listCategoriesHandler = new ListCategoriesHandler();
const createCategoryHandler = new CreateCategoryHandler();
const importCategoryHandler = new ImportCategoryHandler();

categoriesRoutes.get('/', listCategoriesHandler.handle);
categoriesRoutes.post('/', createCategoryHandler.handle);
categoriesRoutes.post('/import', upload.single('file'), importCategoryHandler.handle);
