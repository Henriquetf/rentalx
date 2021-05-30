import { getRepository, Repository } from 'typeorm';

import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';

import { Rental } from '../entities/Rental';

export class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async create(params: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create(params);

    await this.repository.save(rental);

    return rental;
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental | undefined> {
    const rental = this.repository.findOne({
      where: {
        car_id,
        end_date: null,
      },
    });

    return rental;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental | undefined> {
    const rental = this.repository.findOne({
      where: {
        user_id,
        end_date: null,
      },
    });

    return rental;
  }
}
