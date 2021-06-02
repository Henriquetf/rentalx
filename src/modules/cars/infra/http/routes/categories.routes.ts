import { Router } from 'express';
import multer from 'multer';

import { makeUploadStorage } from '@config/upload';

import { CreateCategoryHandler } from '@modules/cars/useCases/createCategory/CreateCategoryHandler';
import { ImportCategoryHandler } from '@modules/cars/useCases/importCategory/ImportCategoryHandler';
import { ListCategoriesHandler } from '@modules/cars/useCases/listCategories/ListCategoriesHandler';
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

export const categoriesRoutes = Router();

const uploadCategory = multer(makeUploadStorage('./tmp/category'));

const listCategoriesHandler = new ListCategoriesHandler();
const createCategoryHandler = new CreateCategoryHandler();
const importCategoryHandler = new ImportCategoryHandler();

categoriesRoutes.use(ensureAuthenticated);
categoriesRoutes.get('/', listCategoriesHandler.handle);

categoriesRoutes.use(ensureAdmin);
categoriesRoutes.post('/', createCategoryHandler.handle);
categoriesRoutes.post('/import', uploadCategory.single('file'), importCategoryHandler.handle);
