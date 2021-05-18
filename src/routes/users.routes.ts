import { Router } from 'express';
import multer from 'multer';

import { makeUploadStorage } from '../config/upload';

import { CreateUserHandler } from '../modules/auth/useCases/createUser/CreateUserHandler';
import { UpdateUserAvatarHandler } from '../modules/auth/useCases/updateUserAvatar/UpdateUserAvatarHandler';
import { ensureAnthenticated } from '../shared/middlewares/ensureAuthenticated';

export const usersRoutes = Router();

const uploadAvatar = multer(makeUploadStorage('./avatars'));

const createUserHandler = new CreateUserHandler();
const updateUserAvatarHandler = new UpdateUserAvatarHandler();

usersRoutes.post('/', createUserHandler.handle);

usersRoutes.use(ensureAnthenticated);

usersRoutes.patch('/avatar', uploadAvatar.single('avatar'), updateUserAvatarHandler.handle);
