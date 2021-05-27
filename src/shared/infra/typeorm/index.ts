import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export async function makeDatabaseConnection(host = 'database'): Promise<Connection> {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host,
    }),
  );
}
