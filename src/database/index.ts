import { createConnection } from 'typeorm';

export async function makeDatabaseConnection(): Promise<void> {
  await createConnection();
}
