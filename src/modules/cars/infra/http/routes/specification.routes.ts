import { Router } from 'express';

import { CreateSpecificationHandler } from '@modules/cars/useCases/createSpecification/CreateSpecificationHandler';

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

export const specificationRoutes = Router();

const createSpecificationHandler = new CreateSpecificationHandler();

specificationRoutes.use(ensureAuthenticated);
specificationRoutes.post('/', createSpecificationHandler.handle);
