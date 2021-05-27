import { RequestHandler } from 'express';

import { AppError } from '@shared/errors/AppError';

export const ensureAdmin: RequestHandler = (request, response, next) => {
  const { isAdmin } = request.user;

  if (!isAdmin) {
    throw new AppError('User is not an admin.');
  }

  return next();
};
