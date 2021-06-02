import { inject, injectable } from 'tsyringe';

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { AppError } from '@shared/errors/AppError';
import { IDateProvider } from '@shared/providers/DateProvider/IDateProvider';

interface IRequest {
  rental_id: string;
  user_id: string;
}

const MIN_DAILY = 1;

@injectable()
export class EndRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({ rental_id, user_id }: IRequest): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(rental_id);

    if (!rental) {
      throw new AppError('Rental does not exist.');
    }

    if (rental.user_id !== user_id) {
      throw new AppError('Rental does not exist.');
    }

    if (rental.end_date) {
      throw new AppError('Rental has ended already.');
    }

    const car = await this.carsRepository.findById(rental.car_id);

    if (!car) {
      throw new AppError('Car does not exist.');
    }

    const dateNow = this.dateProvider.dateNow();

    let daily = this.dateProvider.compareInDays(rental.start_date, dateNow);

    if (daily < MIN_DAILY) {
      daily = MIN_DAILY;
    }

    let totalFine = 0;

    const returnDelay = this.dateProvider.compareInDays(rental.expected_return_date, dateNow);

    if (returnDelay > 0) {
      totalFine = returnDelay * car.fine_amount;
    }

    const totalPrice = totalFine + daily * car.daily_rate;

    rental.end_date = dateNow;
    rental.total = totalPrice;

    await this.rentalsRepository.update(rental);
    await this.carsRepository.updateAvailable(car.id, true);

    return rental;
  }
}
