import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarUseCase } from './CreateCarUseCase';

describe('Create Car', () => {
  let carsRepository: CarsRepositoryInMemory;
  let createCarUseCase: CreateCarUseCase;

  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'CarNivore',
      brand: 'Dio Brando',
      description: 'Detailed car description',
      license_plate: 'ABC8D90',
      daily_rate: 100,
      fine_amount: 60,
      category_id: '5d0c8e2c-4c2c-4d88-a3ea-77eec955fd71',
    });

    expect(car).toHaveProperty('id');
  });

  it('should be able to create a car and field available be true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car Available',
      brand: 'Dio Brando',
      description: 'Available car description',
      license_plate: 'ABC8D90',
      daily_rate: 100,
      fine_amount: 60,
      category_id: '5d0c8e2c-4c2c-4d88-a3ea-77eec955fd71',
    });

    expect(car.available).toBe(true);
  });
});
