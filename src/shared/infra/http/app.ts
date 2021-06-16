/* eslint-disable no-console */
import 'reflect-metadata';

import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

import 'dotenv/config';

import swaggerUi from 'swagger-ui-express';

import '@shared/container';

import { getStoragePath } from '@config/upload';
import { AppError } from '@shared/errors/AppError';
import { router } from '@shared/infra/http/routes';

import swaggerFile from '../../../docs/swagger.json';
import { rateLimiter } from './middlewares/rateLimiter';

const app = express();

app.use(rateLimiter);

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app }),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.disable('x-powered-by');

app.use(cors());

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use('/avatars', express.static(getStoragePath('avatars')));
app.use('/cars', express.static(getStoragePath('cars')));

app.use(express.json());
app.use(router);

app.use(Sentry.Handlers.errorHandler());

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message,
    });
  }

  console.log(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

export { app };
