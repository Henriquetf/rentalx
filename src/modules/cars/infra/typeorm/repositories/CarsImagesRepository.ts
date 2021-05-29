import { getRepository, Repository } from 'typeorm';

import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository';

import { CarImage } from '../entities/CarImage';

export class CarsImagesRepository implements ICarsImagesRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = getRepository(CarImage);
  }

  async create(car_id: string, images_name: string[]): Promise<void> {
    const images = images_name.map((image_name) => ({
      car_id,
      image_name,
    }));

    await this.repository.manager.insert(CarImage, images);
  }
}
