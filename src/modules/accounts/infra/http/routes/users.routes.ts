import { Router } from 'express';
import multer from 'multer';

import { makeUploadStorage } from '@config/upload';

import { CreateUserHandler } from '@modules/accounts/useCases/createUser/CreateUserHandler';
import { GetUserProfileHandler } from '@modules/accounts/useCases/getUserProfile/GetUserProfileHandler';
import { UpdateUserAvatarHandler } from '@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarHandler';

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

export const usersRoutes = Router();

const uploadAvatar = multer(makeUploadStorage('avatars'));

const createUserHandler = new CreateUserHandler();
const updateUserAvatarHandler = new UpdateUserAvatarHandler();
const getUserProfileHandler = new GetUserProfileHandler();

usersRoutes.post('/', createUserHandler.handle);

usersRoutes.use(ensureAuthenticated);

usersRoutes.patch('/avatar', uploadAvatar.single('avatar'), updateUserAvatarHandler.handle);

usersRoutes.get('/profile', getUserProfileHandler.handle);
