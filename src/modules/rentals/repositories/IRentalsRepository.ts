import { ICreateRentalDTO } from '../dtos/ICreateRentalDTO';
import { Rental } from '../infra/typeorm/entities/Rental';

export interface IRentalsRepository {
  findByUserId(user_id: string): Promise<Rental[]>;
  findById(id: string): Promise<Rental | undefined>;
  create(params: ICreateRentalDTO): Promise<Rental>;
  update(rental: Rental): Promise<Rental>;
  findOpenRentalByCar(car_id: string): Promise<Rental | undefined>;
  findOpenRentalByUser(user_id: string): Promise<Rental | undefined>;
}
