import { ICreateCarDTO } from '../dtos/ICreateCarDTO';
import { IFindAvailableCarDTO } from '../dtos/IFindAvailableCarDTO';
import { Car } from '../infra/typeorm/entities/Car';

export interface ICarsRepository {
  create(params: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car | undefined>;
  findAvailable(params?: IFindAvailableCarDTO): Promise<Car[]>;
}
