import { hash } from 'bcrypt';

import { User } from '@modules/accounts/infra/typeorm/entities/User';

import { makeDatabaseConnection } from '..';

async function create() {
  const connection = await makeDatabaseConnection();
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

  await connection.close();
}

create()
  .then(() => console.log('Users created'))
  .catch(console.log);
