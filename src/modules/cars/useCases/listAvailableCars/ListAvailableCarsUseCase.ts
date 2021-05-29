import { inject, injectable } from 'tsyringe';

import { IFindAvailableCarDTO } from '@modules/cars/dtos/IFindAvailableCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

@injectable()
export class ListAvailableCarsUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  async execute(params?: IFindAvailableCarDTO): Promise<Car[]> {
    const cars = await this.carsRepository.findAvailable(params);

    return cars;
  }
}
