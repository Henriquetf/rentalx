import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from './User';

@Entity('users_tokens')
export class UserToken {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  refresh_token!: string;

  @ManyToOne(() => User)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user?: User;

  @Column()
  user_id!: string;

  @Column()
  expiration_date!: Date;

  @CreateDateColumn()
  created_at!: Date;
}
