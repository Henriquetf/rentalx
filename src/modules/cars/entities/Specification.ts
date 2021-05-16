import { v4 as uuidv4 } from 'uuid';

export class Specification {
  id?: string;

  name: string;

  description: string;

  created_at: Date;

  constructor({ description, name }: Pick<Specification, 'name' | 'description'>) {
    this.id = uuidv4();
    this.description = description;
    this.name = name;
    this.created_at = new Date();
  }
}
