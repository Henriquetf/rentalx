import dayjs from 'dayjs';

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';

import { AppError } from '@shared/errors/AppError';
import { IDateProvider } from '@shared/providers/DateProvider/IDateProvider';
import { DayjsDateProvider } from '@shared/providers/DateProvider/implementations/DayjsDateProvider';

import { CreateRentalUseCase } from './CreateRentalUseCase';

describe('Create Rental', () => {
  const date24hoursFromNow = dayjs().add(1, 'day').toDate();

  let dateProvider: IDateProvider;
  let rentalsRepository: IRentalsRepository;
  let createRentalUseCase: CreateRentalUseCase;
  let carsRepository: ICarsRepository;

  beforeEach(() => {
    dateProvider = new DayjsDateProvider();
    rentalsRepository = new RentalsRepositoryInMemory();
    carsRepository = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(dateProvider, rentalsRepository, carsRepository);
  });

  it('should be able to create a rental', async () => {
    const car = await carsRepository.create({
      name: 'CarNivore',
      brand: 'Dio Brando',
      description: 'Detailed car description',
      license_plate: 'ABC8D90',
      daily_rate: 100,
      fine_amount: 60,
      category_id: '5d0c8e2c-4c2c-4d88-a3ea-77eec955fd71',
    });

    const rental = await createRentalUseCase.execute({
      user_id: '123456',
      car_id: car.id,
      expected_return_date: date24hoursFromNow,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be a able to create a new rental if there is another open rental to the same user', async () => {
    const user_id = '123456';
    const car_id = '123456';

    await createRentalUseCase.execute({
      user_id,
      car_id,
      expected_return_date: date24hoursFromNow,
    });

    await expect(
      createRentalUseCase.execute({
        user_id,
        car_id: '7890',
        expected_return_date: date24hoursFromNow,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be a able to create a new rental if there is another open rental to the same car', async () => {
    await createRentalUseCase.execute({
      user_id: '123456',
      car_id: '123456',
      expected_return_date: date24hoursFromNow,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: '7890',
        car_id: '123456',
        expected_return_date: date24hoursFromNow,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be a able to create a new rental with invalid return time', async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: '7890',
        car_id: '123456',
        expected_return_date: dayjs().toDate(),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
