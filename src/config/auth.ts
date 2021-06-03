export const authConfig = {
  access_token: {
    secret: process.env.ACCESS_TOKEN_SECRET,
    expires_in: '15m',
  },
  refresh_token: {
    secret: process.env.REFRESH_TOKEN_SECRET,
    expires_in: '30d',
    expires_in_days: 30,
  },
};
