import { Router } from 'express';

import { CreateCarHandler } from '@modules/cars/useCases/createCar/CreateCarHandler';
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';
import { ensureAnthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

export const carsRoutes = Router();

const createCarHandler = new CreateCarHandler();

carsRoutes.post('/', ensureAnthenticated, ensureAdmin, createCarHandler.handle);
