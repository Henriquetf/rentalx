import { Router } from 'express';

import { CreateSpecificationHandler } from '../modules/cars/useCases/createSpecification/CreateSpecificationHandler';

export const specificationRoutes = Router();

const createSpecificationHandler = new CreateSpecificationHandler();

specificationRoutes.post('/', createSpecificationHandler.handle);
