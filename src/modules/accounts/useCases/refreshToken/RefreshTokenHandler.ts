import { RequestHandler } from 'express';
import { container } from 'tsyringe';

import { RefreshTokenUseCase } from './RefreshTokenUseCase';

export class RefreshTokenHandler {
  handle: RequestHandler = async (request, response) => {
    const token = request.body.token || request.headers['x-access-header'] || request.query.token;

    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

    const refresh_token = await refreshTokenUseCase.execute(token);

    return response.json({
      refresh_token,
    });
  };
}
