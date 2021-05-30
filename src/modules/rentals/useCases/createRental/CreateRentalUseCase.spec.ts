import dayjs from 'dayjs';

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

  beforeEach(() => {
    dateProvider = new DayjsDateProvider();
    rentalsRepository = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(dateProvider, rentalsRepository);
  });

  it('should be able to create a rental', async () => {
    const rental = await createRentalUseCase.execute({
      user_id: '123456',
      car_id: '123456',
      expected_return_date: date24hoursFromNow,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be a able to create a new rental if there is another open rental to the same user', async () => {
    await createRentalUseCase.execute({
      user_id: '123456',
      car_id: '123456',
      expected_return_date: date24hoursFromNow,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: '123456',
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
