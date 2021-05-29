import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Category } from './Category';
import { Specification } from './Specification';

@Entity('cars')
export class Car {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  daily_rate!: number;

  @Column()
  available!: boolean;

  @Column()
  license_plate!: string;

  @Column()
  fine_amount!: number;

  @Column()
  brand!: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category!: Category;

  @Column()
  category_id?: string;

  @ManyToMany(() => Specification)
  @JoinTable({
    name: 'specifications_cars',
    joinColumn: {
      name: 'car_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'specification_id',
      referencedColumnName: 'id',
    },
  })
  specifications?: Specification[];

  @CreateDateColumn()
  created_at!: Date;

  constructor() {
    this.available = true;
  }
}
