import { Router } from 'express';
import multer from 'multer';

import { makeUploadStorage } from '../config/upload';

import { CreateCategoryHandler } from '../modules/cars/useCases/createCategory/CreateCategoryHandler';
import { ImportCategoryHandler } from '../modules/cars/useCases/importCategory/ImportCategoryHandler';
import { ListCategoriesHandler } from '../modules/cars/useCases/listCategories/ListCategoriesHandler';

export const categoriesRoutes = Router();

const uploadCategory = multer(makeUploadStorage('./tmp/category'));

const listCategoriesHandler = new ListCategoriesHandler();
const createCategoryHandler = new CreateCategoryHandler();
const importCategoryHandler = new ImportCategoryHandler();

categoriesRoutes.get('/', listCategoriesHandler.handle);
categoriesRoutes.post('/', createCategoryHandler.handle);
categoriesRoutes.post('/import', uploadCategory.single('file'), importCategoryHandler.handle);
