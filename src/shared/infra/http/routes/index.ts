import { Router } from 'express';

import { authenticateRoutes } from '@modules/accounts/infra/http/routes/authenticate.routes';
import { usersRoutes } from '@modules/accounts/infra/http/routes/users.routes';
import { carsRoutes } from '@modules/cars/infra/http/routes/cars.routes';
import { categoriesRoutes } from '@modules/cars/infra/http/routes/categories.routes';
import { specificationRoutes } from '@modules/cars/infra/http/routes/specification.routes';

export const router = Router();

router.use('/categories', categoriesRoutes);
router.use('/specifications', specificationRoutes);
router.use('/users', usersRoutes);
router.use('/auth', authenticateRoutes);
router.use('/cars', carsRoutes);
