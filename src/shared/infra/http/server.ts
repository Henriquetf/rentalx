/* eslint-disable no-console */
import { makeDatabaseConnection } from '@shared/infra/typeorm';

import { app } from './app';

makeDatabaseConnection()
  .then(() => {
    app.listen(3333, () => console.log('Server is runnning'));
  })
  .catch(console.log);
