import fs from 'fs';

import csvParse from 'csv-parse';
import { inject, injectable } from 'tsyringe';

import { deleteFile } from '../../../../utils/file';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface IImportCategory {
  name: string;
  description: string;
}

@injectable()
export class ImportCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

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

    await deleteFile(file.path);

    const createCategoriesPromises = categories.map(async (category) => {
      const categoryExists = await this.categoriesRepository.findByName(category.name);

      if (!categoryExists) {
        await this.categoriesRepository.create(category);
      }
    });

    await Promise.all(createCategoriesPromises);
  }
}
