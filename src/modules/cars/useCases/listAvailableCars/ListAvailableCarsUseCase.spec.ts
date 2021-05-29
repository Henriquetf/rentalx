import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

describe('List Cars', () => {
  let carsRepositoryInMemory: CarsRepositoryInMemory;
  let listAvailableCarsUseCase: ListAvailableCarsUseCase;

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });

  it('should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Available car',
      brand: 'Dio Brando',
      description: 'Detailed car description',
      license_plate: 'ABC8D90',
      daily_rate: 100,
      fine_amount: 60,
      category_id: '5d0c8e2c-4c2c-4d88-a3ea-77eec955fd71',
    });

    const cars = await listAvailableCarsUseCase.execute();

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Available car',
      brand: 'Dio Brando',
      description: 'Detailed car description',
      license_plate: 'ABC8D90',
      daily_rate: 100,
      fine_amount: 60,
      category_id: '5d0c8e2c-4c2c-4d88-a3ea-77eec955fd71',
    });

    await carsRepositoryInMemory.create({
      name: 'Secondary car',
      brand: 'Dio Brando',
      description: 'Detailed car description',
      license_plate: 'ABC8D90',
      daily_rate: 100,
      fine_amount: 60,
      category_id: '5d0c8e2c-4c2c-4d88-a3ea-77eec955fd71',
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: 'Available car',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Available car',
      brand: 'Dio Brando',
      description: 'Detailed car description',
      license_plate: 'ABC8D90',
      daily_rate: 100,
      fine_amount: 60,
      category_id: '5d0c8e2c-4c2c-4d88-a3ea-77eec955fd71',
    });

    await carsRepositoryInMemory.create({
      name: 'Secondary car',
      brand: 'Dio Joestar',
      description: 'Detailed car description',
      license_plate: 'ABC8D90',
      daily_rate: 100,
      fine_amount: 60,
      category_id: '5d0c8e2c-4c2c-4d88-a3ea-77eec955fd71',
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: 'Dio Brando',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by category', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Available car',
      brand: 'Dio Brando',
      description: 'Detailed car description',
      license_plate: 'ABC8D90',
      daily_rate: 100,
      fine_amount: 60,
      category_id: '6f816d88-67f5-45c7-b953-042426c37ee0',
    });

    await carsRepositoryInMemory.create({
      name: 'Secondary car',
      brand: 'Dio Joestar',
      description: 'Detailed car description',
      license_plate: 'ABC8D90',
      daily_rate: 100,
      fine_amount: 60,
      category_id: 'd9b46ef5-14d6-4c0b-b304-87eb0c8bf720',
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: '6f816d88-67f5-45c7-b953-042426c37ee0',
    });

    expect(cars).toEqual([car]);
  });
});
