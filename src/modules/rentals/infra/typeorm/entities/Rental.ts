import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Car } from '@modules/cars/infra/typeorm/entities/Car';

@Entity('rentals')
export class Rental {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Car)
  @JoinColumn({
    name: 'car_id',
    referencedColumnName: 'id',
  })
  car?: Car;

  @Column()
  car_id!: string;

  @Column()
  user_id!: string;

  @Column()
  start_date!: Date;

  @Column()
  end_date?: Date;

  @Column()
  expected_return_date!: Date;

  @Column()
  total?: number;

  @CreateDateColumn()
  created_at!: string;

  @UpdateDateColumn()
  updated_at!: string;
}
