import { Expose } from 'class-transformer';
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

  @Expose({ name: 'avatar_url' })
  avatar_url(): string | null {
    if (!this.avatar) {
      return null;
    }

    switch (process.env.STORAGE_DISK) {
      case 'local':
        return `${process.env.APP_URL || ''}/avatars/${this.avatar}`;

      case 'S3':
        return `${process.env.AWS_BUCKET_URL || ''}/avatars/${this.avatar}`;

      default:
        return null;
    }
  }
}
