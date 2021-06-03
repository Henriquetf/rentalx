import { RequestHandler } from 'express';
import { verify } from 'jsonwebtoken';

import { authConfig } from '@config/auth';
import { AppError } from '@shared/errors/AppError';

interface ITokenPayload {
  sub: string;
}

export const ensureAuthenticated: RequestHandler = (request, _, next) => {
  const { authorization } = request.headers;

  if (!authorization) {
    throw new AppError('Authorization header not provided', 401);
  }

  const [, token] = authorization.split(' ');

  try {
    const decodedToken = verify(token, authConfig.access_token.secret) as ITokenPayload;

    request.user = {
      id: decodedToken.sub,
      isAdmin: request.user?.isAdmin || false,
    };

    next();
  } catch {
    throw new AppError('Invalid authentication token', 401);
  }
};
