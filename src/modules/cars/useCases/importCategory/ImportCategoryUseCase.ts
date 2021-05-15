import fs from 'fs';

import csvParse from 'csv-parse';

import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface IImportCategory {
  name: string;
  description: string;
}

export class ImportCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    const stream = fs.createReadStream(file.path);
    const categories: IImportCategory[] = [];

    const parseFile = csvParse();

    stream.pipe(parseFile);

    parseFile.on('data', (line: string[]) => {
      const [name, description] = line;

      categories.push({
        name,
        description,
      });
    });

    return new Promise((resolve, reject) => {
      parseFile
        .on('end', () => {
          resolve(categories);
        })
        .on('error', reject);
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    await fs.promises.unlink(file.path);

    categories.forEach((category) => {
      const categoryExists = this.categoriesRepository.findByName(category.name);

      if (!categoryExists) {
        this.categoriesRepository.create(category);
      }
    });
  }
}
