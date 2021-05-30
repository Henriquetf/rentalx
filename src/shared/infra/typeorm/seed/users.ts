import { hash } from 'bcrypt';

import { Connection } from 'typeorm';

import { User } from '@modules/accounts/infra/typeorm/entities/User';

export async function seedUsers(connection: Connection): Promise<void> {
  const usersRepository = connection.getRepository(User);

  const password = await hash('admin', 8);

  await usersRepository.save({
    name: 'Admin',
    email: 'admin@rentalx.com',
    driver_license: '000111XXX',
    password,
    is_admin: true,
  });

  const passwordUser = await hash('user', 8);

  await usersRepository.save({
    name: 'User',
    email: 'user@rentalx.com',
    driver_license: '000222XXX',
    password: passwordUser,
  });
}
