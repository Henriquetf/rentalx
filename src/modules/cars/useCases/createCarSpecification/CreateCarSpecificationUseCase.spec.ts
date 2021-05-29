import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarUseCase } from '../createCar/CreateCarUseCase';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

describe('Create Car Specification', () => {
  let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
  let carsRepository: ICarsRepository;
  let specificationsRepository: ISpecificationsRepository;

  let createCarUseCase: CreateCarUseCase;

  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    specificationsRepository = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepository,
      specificationsRepository,
    );

    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it('should be able to add new specification to an existing car', async () => {
    const car = await createCarUseCase.execute({
      name: 'CarNivore',
      brand: 'Dio Brando',
      description: 'Detailed car description',
      license_plate: 'ABC8D90',
      daily_rate: 100,
      fine_amount: 60,
      category_id: '5d0c8e2c-4c2c-4d88-a3ea-77eec955fd71',
    });

    const specification1 = await specificationsRepository.create({
      name: 'Spec 1',
      description: 'Spec 2',
    });

    const specification2 = await specificationsRepository.create({
      name: 'Spec 2',
      description: 'Spec 2',
    });

    const updatedCar = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id: [specification1.id, specification2.id],
    });

    expect(updatedCar).toHaveProperty('specifications');
    expect(updatedCar.specifications).toMatchObject([
      { id: specification1.id },
      { id: specification2.id },
    ]);
  });

  it('should not be able to add new specification to a nonexistent car', async () => {
    const car_id = '180cdca0-26bc-4652-a4b8-03701fdfbaa0';
    const specifications_id = ['86758e24-b1f0-4b1f-9c35-3367b53c40f6'];

    await expect(
      createCarSpecificationUseCase.execute({ car_id, specifications_id }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
