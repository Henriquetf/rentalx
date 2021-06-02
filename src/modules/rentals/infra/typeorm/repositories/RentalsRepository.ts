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

  async update(rental: Rental): Promise<Rental> {
    const updatedRental = await this.repository.save(rental);

    return updatedRental;
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

  async findById(id: string): Promise<Rental | undefined> {
    const rental = await this.repository.findOne(id);

    return rental;
  }

  async findByUserId(user_id: string): Promise<Rental[]> {
    const rentals = await this.repository.find({
      where: {
        user_id,
      },
      relations: ['car'],
    });

    return rentals;
  }
}
