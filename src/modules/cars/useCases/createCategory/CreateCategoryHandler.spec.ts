import request from 'supertest';
import { Connection } from 'typeorm';

import { app } from '@shared/infra/http/app';
import { makeDatabaseConnection } from '@shared/infra/typeorm';
import { seedUsers } from '@shared/infra/typeorm/seed/users';

describe('Create Category Handler', () => {
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

  it('should be able to create a new category', async () => {
    const token = await loginAdmin();

    const response = await request(app)
      .post('/categories')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        name: 'Category',
        description: 'Test category',
      });

    expect(response.status).toBe(201);
  });

  it('should not be able to create a new category with an existing name', async () => {
    const token = await loginAdmin();

    const response = await request(app)
      .post('/categories')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        name: 'Category',
        description: 'Test category',
      });

    expect(response.status).toBe(400);
  });
});
