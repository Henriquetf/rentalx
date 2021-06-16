import { RequestHandler } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import redis from 'redis';

import { AppError } from '@shared/errors/AppError';

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD,
});

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rateLimiter',
  points: 10,
  duration: 1,
});

export const rateLimiter: RequestHandler = async (request, response, next) => {
  try {
    await limiter.consume(request.ip);

    next();
  } catch (e) {
    throw new AppError('Too many requests', 429);
  }
};
