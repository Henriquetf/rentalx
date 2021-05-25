import { Router } from 'express';

import { CreateSpecificationHandler } from '@modules/cars/useCases/createSpecification/CreateSpecificationHandler';

import { ensureAnthenticated } from '@shared/middlewares/ensureAuthenticated';

export const specificationRoutes = Router();

const createSpecificationHandler = new CreateSpecificationHandler();

specificationRoutes.use(ensureAnthenticated);
specificationRoutes.post('/', createSpecificationHandler.handle);
