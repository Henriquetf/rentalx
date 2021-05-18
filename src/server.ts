/* eslint-disable no-console */
import 'reflect-metadata';

import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

import swaggerUi from 'swagger-ui-express';

import swaggerFile from '../docs/swagger.json';

import { makeDatabaseConnection } from './database';

import './shared/container';

import { router } from './routes';
import { AppError } from './shared/errors/AppError';

const app = express();

app.disable('x-powered-by');

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(express.json());
app.use(router);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

makeDatabaseConnection()
  .then(() => {
    app.listen(3333, () => console.log('Server is runnning'));
  })
  .catch(console.log);
