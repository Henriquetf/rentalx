import path from 'path';

import { Router } from 'express';
import multer from 'multer';

import { createCategoryHandler } from '../modules/cars/useCases/createCategory';
import { importCategoryHandler } from '../modules/cars/useCases/importCategory';
import { listCategoriesHandler } from '../modules/cars/useCases/listCategories';

const upload = multer({
  dest: path.resolve(__dirname, '..', '..', 'storage', 'tmp'),
});

export const categoriesRoutes = Router();

categoriesRoutes.post('/', createCategoryHandler.handle);
categoriesRoutes.get('/', listCategoriesHandler.handler);
categoriesRoutes.post('/import', upload.single('file'), importCategoryHandler.handle);
