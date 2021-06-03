import { RequestHandler } from 'express';
import { verify } from 'jsonwebtoken';
import { container } from 'tsyringe';

import { authConfig } from '@config/auth';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { UsersTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTokensRepository';
import { AppError } from '@shared/errors/AppError';

interface ITokenPayload {
  sub: string;
}

export const ensureAuthenticated: RequestHandler = async (request, response, next) => {
  const { authorization } = request.headers;

  if (!authorization) {
    throw new AppError('Authorization header not provided', 401);
  }

  const [, token] = authorization.split(' ');

  let userId: string;

  try {
    const decodedToken = verify(token, authConfig.refresh_token.secret) as ITokenPayload;

    userId = decodedToken.sub;
  } catch {
    throw new AppError('Invalid authentication token', 401);
  }

  const usersRepository = container.resolve(UsersRepository);
  const usersTokensRepository = container.resolve(UsersTokensRepository);

  const userToken = await usersTokensRepository.findByRefreshTokenAndUser(token, userId);

  if (!userToken) {
    throw new AppError('Invalid authentication token', 401);
  }

  const user = await usersRepository.findById(userId);

  if (!user) {
    throw new AppError('User does not exist', 401);
  }

  request.user = {
    id: user.id,
    isAdmin: user.is_admin,
  };

  next();
};
