import { getRepository, Repository } from 'typeorm';

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { IFindAvailableCarDTO } from '@modules/cars/dtos/IFindAvailableCarDTO';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

import { Car } from '../entities/Car';

export class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async findById(car_id: string): Promise<Car | undefined> {
    const car = await this.repository.findOne(car_id);

    return car;
  }

  async create(params: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create(params);

    await this.repository.save(car);

    return car;
  }

  async update(car: Car): Promise<Car> {
    const updatedCar = await this.repository.save(car);

    return updatedCar;
  }

  async findAvailable(params?: IFindAvailableCarDTO): Promise<Car[]> {
    const carsQuery = this.repository
      .createQueryBuilder('c')
      .where('c.available = :available', { available: true });

    if (params) {
      const { brand, category_id, name } = params;

      if (brand) {
        carsQuery.andWhere('c.brand = :brand', { brand });
      }
      if (category_id) {
        carsQuery.andWhere('c.category_id = :category_id', { category_id });
      }
      if (name) {
        carsQuery.andWhere('c.name ILIKE :name', {
          name: `%${name}%`,
        });
      }
    }

    const cars = await carsQuery.getMany();

    return cars;
  }

  async findByLicensePlate(license_plate: string): Promise<Car | undefined> {
    const car = this.repository.findOne({
      where: {
        license_plate,
      },
    });

    return car;
  }
}
