/* eslint-disable no-console */
import 'reflect-metadata';

import express from 'express';
import swaggerUi from 'swagger-ui-express';

import swaggerFile from '../docs/swagger.json';

import { makeDatabaseConnection } from './database';

import { router } from './routes';

const app = express();

app.disable('x-powered-by');

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(express.json());
app.use(router);

makeDatabaseConnection()
  .then(() => {
    app.listen(3333, () => console.log('Server is runnning'));
  })
  .catch(console.log);
