import { RequestHandler } from 'express';
import { verify } from 'jsonwebtoken';
import { container } from 'tsyringe';

import { UsersRepository } from '@modules/auth/repositories/implementations/UsersRepository';
import { AppError } from '@shared/errors/AppError';

interface ITokenPayload {
  sub: string;
}

export const ensureAnthenticated: RequestHandler = async (request, response, next) => {
  const { authorization } = request.headers;

  if (!authorization) {
    throw new AppError('Authorization header not provided', 401);
  }

  const [, token] = authorization.split(' ');

  let userId: string;

  try {
    const decodedToken = verify(
      token,
      't8lLDIAkCBxBNy2tPgNybIkE/V1omdPkab0csXTI2efqFTXdeIh70WFPfDuKK7RmC1ZP7j0jRJHbT4ex7FTeOotjYzwA0xQT60Np0jT5OvqV4g0yL/GCCBTJsOPVuTC7Cm6DKjE+APT05oskb1PLAXgvI92NWT3S9dZP51v87fQD/s4JHRzbsq/uqgm6tWH7BrMuxVSlLDLH8SI0rlp3ef89/zyAT2IUSiDw0Q==%',
    ) as ITokenPayload;

    userId = decodedToken.sub;
  } catch {
    throw new AppError('Invalid token', 401);
  }

  const usersRepository = container.resolve(UsersRepository);

  const user = await usersRepository.findById(userId);

  if (!user) {
    throw new AppError('User does not exist', 401);
  }

  request.user = {
    id: user.id,
  };

  next();
};
