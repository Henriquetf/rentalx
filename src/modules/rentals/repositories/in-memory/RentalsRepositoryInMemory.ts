/* eslint-disable @typescript-eslint/require-await */
import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';

import { IRentalsRepository } from '../IRentalsRepository';

export class RentalsRepositoryInMemory implements IRentalsRepository {
  private rentals: Rental[] = [];

  async findOpenRentalByCar(car_id: string): Promise<Rental | undefined> {
    return this.rentals.find((r) => r.car_id === car_id && !r.end_date);
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental | undefined> {
    return this.rentals.find((r) => r.user_id === user_id && !r.end_date);
  }

  async create(params: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, params, {
      id: `${params.car_id}_${params.user_id}_${params.expected_return_date.toISOString()}`,
      start_date: new Date(),
      end_date: null,
    });

    this.rentals.push(rental);

    return rental;
  }

  async update(rental: Rental): Promise<Rental> {
    const rentalIndex = this.rentals.findIndex((r) => r.id === rental.id);

    if (rentalIndex > -1) {
      this.rentals[rentalIndex] = rental;
    } else {
      this.rentals.push(rental);
    }

    return rental;
  }

  async findById(id: string): Promise<Rental | undefined> {
    return this.rentals.find((r) => r.id === id);
  }

  async findByUserId(user_id: string): Promise<Rental[]> {
    return this.rentals.filter((r) => r.user_id === user_id);
  }
}
