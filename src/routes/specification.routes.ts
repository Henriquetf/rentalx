import { Router } from 'express';

import { createSpecificationHandler } from '../modules/cars/useCases/createSpecification';

export const specificationRoutes = Router();

specificationRoutes.post('/', createSpecificationHandler.handle);
