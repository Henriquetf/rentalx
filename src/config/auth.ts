import { AppError } from '@shared/errors/AppError';

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

if (!accessTokenSecret) {
  throw new AppError('Access token secret cannot be empty.');
}

if (!refreshTokenSecret) {
  throw new AppError('Refresh token secret cannot be empty.');
}

export const authConfig = {
  access_token: {
    secret: accessTokenSecret,
    expires_in: '15m',
  },
  refresh_token: {
    secret: refreshTokenSecret,
    expires_in: '30d',
    expires_in_days: 30,
  },
};
