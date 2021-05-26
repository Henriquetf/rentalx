import { Router } from 'express';

import { AuthenticateUserHandler } from '@modules/accounts/useCases/authenticateUser/AuthenticateUserHandler';

export const authenticateRoutes = Router();

const authentcateUserHandler = new AuthenticateUserHandler();

authenticateRoutes.post('/sessions', authentcateUserHandler.handle);
