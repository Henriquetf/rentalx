/* eslint-disable @typescript-eslint/require-await */
import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

import { ICarsRepository } from '../ICarsRepository';

export class CarsRepositoryInMemory implements ICarsRepository {
  private cars: Car[] = [];

  async findByLicensePlate(license_plate: string): Promise<Car | undefined> {
    return this.cars.find((car) => car.license_plate === license_plate);
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
