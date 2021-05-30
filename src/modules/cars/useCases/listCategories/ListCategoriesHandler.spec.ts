import request from 'supertest';
import { Connection } from 'typeorm';

import { app } from '@shared/infra/http/app';
import { makeDatabaseConnection } from '@shared/infra/typeorm';
import { seedUsers } from '@shared/infra/typeorm/seed/users';

describe('List Categories', () => {
  let connection: Connection;

  beforeAll(async () => {
    connection = await makeDatabaseConnection();

    await connection.runMigrations();
    await seedUsers(connection);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  async function loginAdmin(): Promise<string> {
    const response = await request(app).post('/auth/sessions').send({
      email: 'admin@rentalx.com',
      password: 'admin',
    });

    return response.body.token;
  }

  it('should be able to list all categories', async () => {
    const token = await loginAdmin();

    const newCategory = {
      name: 'Category',
      description: 'Test category',
    };

    await request(app)
      .post('/categories')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send(newCategory);

    const response = await request(app).get('/categories').send();

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject([newCategory]);
  });
});
