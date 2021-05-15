import { v4 as uuidv4 } from 'uuid';

export class Category {
  id?: string;

  name: string;

  description: string;

  created_at: Date;

  constructor({ description, name }: Pick<Category, 'name' | 'description'>) {
    this.id = uuidv4();
    this.description = description;
    this.name = name;
    this.created_at = new Date();
  }
}
