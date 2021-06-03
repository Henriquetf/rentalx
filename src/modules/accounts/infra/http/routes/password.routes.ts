import { Router } from 'express';

import { ResetUserPasswordHandler } from '@modules/accounts/useCases/resetUserPassword/ResetUserPasswordHandler';
import { SendForgotPasswordMailHandler } from '@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailHandler';

export const passwordRoutes = Router();

const sendForgotPasswordMailHandler = new SendForgotPasswordMailHandler();
const resetUserPasswordHandler = new ResetUserPasswordHandler();

passwordRoutes.post('/forgot', sendForgotPasswordMailHandler.handle);
passwordRoutes.post('/reset', resetUserPasswordHandler.handle);
