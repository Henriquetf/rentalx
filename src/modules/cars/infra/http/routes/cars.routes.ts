import { Router } from 'express';

import multer from 'multer';

import { makeUploadStorage } from '@config/upload';
import { CreateCarHandler } from '@modules/cars/useCases/createCar/CreateCarHandler';
import { CreateCarSpecificationHandler } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationHandler';
import { ListAvailableCarsHandler } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsHandler';
import { UploadCarImagesHandler } from '@modules/cars/useCases/uploadCarImages/UploadCarImagesHandler';
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

export const carsRoutes = Router();

const uploadCarImages = multer(makeUploadStorage('./cars'));

const createCarHandler = new CreateCarHandler();
const listAvailableCarsHandler = new ListAvailableCarsHandler();
const createCarsSpecificationHandler = new CreateCarSpecificationHandler();
const uploadCarImagesHandler = new UploadCarImagesHandler();

carsRoutes.get('/available', listAvailableCarsHandler.handle);

carsRoutes.use(ensureAuthenticated, ensureAdmin);
carsRoutes.post('/', createCarHandler.handle);
carsRoutes.post('/specifications/:id', createCarsSpecificationHandler.handle);
carsRoutes.post('/images/:id', uploadCarImages.array('images'), uploadCarImagesHandler.handle);
