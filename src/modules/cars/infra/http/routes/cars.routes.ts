import { Router } from 'express';

import { CreateCarHandler } from '@modules/cars/useCases/createCar/CreateCarHandler';
import { ListAvailableCarsHandler } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsHandler';
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';
import { ensureAnthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

export const carsRoutes = Router();

const createCarHandler = new CreateCarHandler();
const listAvailableCarsHandler = new ListAvailableCarsHandler();

carsRoutes.post('/', ensureAnthenticated, ensureAdmin, createCarHandler.handle);
carsRoutes.get('/available', listAvailableCarsHandler.handle);
