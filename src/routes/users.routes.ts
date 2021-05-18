import { Router } from 'express';

import { CreateUserHandler } from '../modules/auth/useCases/createUser/CreateUserHandler';

export const usersRoutes = Router();

const createUserHandler = new CreateUserHandler();

usersRoutes.post('/', createUserHandler.handle);
