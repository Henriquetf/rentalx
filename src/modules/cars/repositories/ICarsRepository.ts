import { ICreateCarDTO } from '../dtos/ICreateCarDTO';
import { IFindAvailableCarDTO } from '../dtos/IFindAvailableCarDTO';
import { Car } from '../infra/typeorm/entities/Car';

export interface ICarsRepository {
  create(params: ICreateCarDTO): Promise<Car>;
  update(car: Car): Promise<Car>;
  findById(car_id: string): Promise<Car | undefined>;
  findByLicensePlate(license_plate: string): Promise<Car | undefined>;
  findAvailable(params?: IFindAvailableCarDTO): Promise<Car[]>;
  updateAvailable(id: string, available: boolean): Promise<void>;
}
