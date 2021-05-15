import express from 'express';
import swaggerUi from 'swagger-ui-express';

import swaggerFile from '../docs/swagger.json';

import { router } from './routes';

const app = express();

app.disable('x-powered-by');

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(express.json());
app.use(router);

app.listen(3333, () => console.log('Server is runnning'));
