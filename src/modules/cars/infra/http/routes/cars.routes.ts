import { Router } from 'express';

import { CreateCarHandler } from '@modules/cars/useCases/createCar/CreateCarHandler';
import { CreateCarSpecificationHandler } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationHandler';
import { ListAvailableCarsHandler } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsHandler';
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';
import { ensureAnthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

export const carsRoutes = Router();

const createCarHandler = new CreateCarHandler();
const listAvailableCarsHandler = new ListAvailableCarsHandler();
const createCarsSpecificationHandler = new CreateCarSpecificationHandler();

carsRoutes.get('/available', listAvailableCarsHandler.handle);

carsRoutes.use(ensureAnthenticated, ensureAdmin);
carsRoutes.post('/', createCarHandler.handle);
carsRoutes.post('/specifications/:id', createCarsSpecificationHandler.handle);
