/* eslint-disable @typescript-eslint/require-await */
import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { IFindAvailableCarDTO } from '@modules/cars/dtos/IFindAvailableCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

import { ICarsRepository } from '../ICarsRepository';

export class CarsRepositoryInMemory implements ICarsRepository {
  private cars: Car[] = [];

  async findByLicensePlate(license_plate: string): Promise<Car | undefined> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async findAvailable(params?: IFindAvailableCarDTO): Promise<Car[]> {
    return this.cars
      .filter((car) => car.available)
      .filter(
        (car) =>
          !params ||
          (params.brand && car.brand === params.brand) ||
          (params.category_id && car.category_id === params.category_id) ||
          (params.name && car.name === params.name),
      );
  }

  async create(params: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, params, {
      id: params.name,
    });

    this.cars.push(car);

    return car;
  }
}
