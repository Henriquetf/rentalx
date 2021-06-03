import { Router } from 'express';

import { AuthenticateUserHandler } from '@modules/accounts/useCases/authenticateUser/AuthenticateUserHandler';
import { RefreshTokenHandler } from '@modules/accounts/useCases/refreshToken/RefreshTokenHandler';

export const authenticateRoutes = Router();

const authentcateUserHandler = new AuthenticateUserHandler();
const refreshTokenHandler = new RefreshTokenHandler();

authenticateRoutes.post('/sessions', authentcateUserHandler.handle);
authenticateRoutes.post('/refreshtoken', refreshTokenHandler.handle);
