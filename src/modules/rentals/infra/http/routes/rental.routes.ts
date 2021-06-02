import { Router } from 'express';

import { CreateRentalHandler } from '@modules/rentals/useCases/createRental/CreateRentalHandler';
import { EndRentalHandler } from '@modules/rentals/useCases/endRental/EndRentalHandler';
import { ListRentalsByUserHandler } from '@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserHandler';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

export const rentalRoutes = Router();

const createRentalHandler = new CreateRentalHandler();
const endRentalHandler = new EndRentalHandler();
const listRentalsByUserHandler = new ListRentalsByUserHandler();

rentalRoutes.use(ensureAuthenticated);
rentalRoutes.post('/', createRentalHandler.handle);
rentalRoutes.post('/end/:id', endRentalHandler.handle);
rentalRoutes.get('/user', listRentalsByUserHandler.handle);
