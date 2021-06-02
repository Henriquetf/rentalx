import { inject, injectable } from 'tsyringe';

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { AppError } from '@shared/errors/AppError';
import { IDateProvider } from '@shared/providers/DateProvider/IDateProvider';

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

const MIN_RENTAL_HOURS = 24;

@injectable()
export class CreateRentalUseCase {
  constructor(
    @inject('DateProvider')
    private dateProvider: IDateProvider,
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  async execute({ car_id, expected_return_date, user_id }: IRequest): Promise<Rental> {
    const openRentalByCar = await this.rentalsRepository.findOpenRentalByCar(car_id);

    if (openRentalByCar) {
      throw new AppError('Car is unavailable');
    }

    const openRentalByUser = await this.rentalsRepository.findOpenRentalByUser(user_id);

    if (openRentalByUser) {
      throw new AppError("There's a rental in progress for user");
    }

    const compare = this.dateProvider.compareInHours(
      this.dateProvider.dateNow(),
      expected_return_date,
    );

    if (compare < MIN_RENTAL_HOURS) {
      throw new AppError('Invalid return date.');
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    await this.carsRepository.updateAvailable(car_id, false);

    return rental;
  }
}
