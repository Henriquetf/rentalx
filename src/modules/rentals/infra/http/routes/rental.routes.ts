import { Router } from 'express';

import { CreateRentalHandler } from '@modules/rentals/useCases/createRental/CreateRentalHandler';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

export const rentalRoutes = Router();

const createRentalHandler = new CreateRentalHandler();

rentalRoutes.use(ensureAuthenticated);
rentalRoutes.post('/', createRentalHandler.handle);
