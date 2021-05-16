import path from 'path';

import { Router } from 'express';
import multer from 'multer';

import { makeCreateCategoryHandler } from '../modules/cars/useCases/createCategory';
import { makeImportCategoryHandler } from '../modules/cars/useCases/importCategory';
import { makeListCategoriesHandler } from '../modules/cars/useCases/listCategories';

const upload = multer({
  dest: path.resolve(__dirname, '..', '..', 'storage', 'tmp'),
});

export const categoriesRoutes = Router();

categoriesRoutes.post('/', (...args) => makeCreateCategoryHandler().handle(...args));
categoriesRoutes.get('/', (...args) => makeListCategoriesHandler().handle(...args));
categoriesRoutes.post('/import', upload.single('file'), (...args) =>
  makeImportCategoryHandler().handle(...args),
);
