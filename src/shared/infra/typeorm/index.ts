import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export async function makeDatabaseConnection(host = 'database'): Promise<Connection> {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host,
      database: process.env.NODE_ENV === 'test' ? 'rentalx_test' : defaultOptions.database,
    }),
  );
}
