import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  driver_license!: string;

  @Column()
  is_admin!: boolean;

  @Column()
  avatar?: string;

  @CreateDateColumn()
  created_at!: Date;
}
