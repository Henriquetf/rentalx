import { Router } from 'express';

import { CreateCarHandler } from '@modules/cars/useCases/createCar/CreateCarHandler';

export const carsRoutes = Router();

const createCarHandler = new CreateCarHandler();

carsRoutes.post('/', createCarHandler.handle);
