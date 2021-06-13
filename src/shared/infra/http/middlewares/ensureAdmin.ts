import { RequestHandler } from 'express';

import { container } from 'tsyringe';

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { AppError } from '@shared/errors/AppError';

export const ensureAdmin: RequestHandler = async (request, _, next) => {
  const userId = request.user.id;

  const usersRepository = container.resolve(UsersRepository);

  const user = await usersRepository.findById(userId);

  if (!user) {
    throw new AppError('User does not exist', 401);
  }

  if (!user.is_admin) {
    throw new AppError('User is not an admin.');
  }

  request.user = {
    id: user.id,
    isAdmin: user.is_admin,
  };

  return next();
};
