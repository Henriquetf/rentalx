import { inject, injectable } from 'tsyringe';

import { CarsImagesRepository } from '@modules/cars/infra/typeorm/repositories/CarsImagesRepository';
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
export class UploadCarImagesUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: CarsRepository,
    @inject('CarsImagesRepository')
    private carsImagesRepository: CarsImagesRepository,
  ) {}

  async execute({ car_id, images_name }: IRequest): Promise<void> {
    const car = await this.carsRepository.findById(car_id);

    if (!car) {
      throw new AppError('Car does not exist.');
    }

    await this.carsImagesRepository.create(car_id, images_name);
  }
}
