import { container } from 'tsyringe';

import { IUsersRepository } from '@modules/auth/repositories/IUsersRepository';
import { UsersRepository } from '@modules/auth/repositories/implementations/UsersRepository';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { CategoriesRepository } from '@modules/cars/repositories/implementations/CategoriesRepository';
import { SpecificationsRepository } from '@modules/cars/repositories/implementations/SpecificationsRepository';

container.registerSingleton<ICategoriesRepository>('CategoriesRepository', CategoriesRepository);

container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  SpecificationsRepository,
);

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);
