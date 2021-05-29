import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

describe('Create Category', () => {
  let categoriesRepository: ICategoriesRepository;
  let createCategoryUseCase: CreateCategoryUseCase;

  beforeEach(() => {
    categoriesRepository = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
  });

  it('should be able to create a new category', async () => {
    const category = {
      name: 'create-new-category',
      description: 'New Category description',
    };

    await createCategoryUseCase.execute(category);

    const createdCategory = await categoriesRepository.findByName(category.name);

    expect(createdCategory).toHaveProperty('id');
  });

  it('should not be able to create a category with an existing name', async () => {
    const category = {
      name: 'create-new-category',
      description: 'New Category description',
    };

    await createCategoryUseCase.execute(category);

    await expect(createCategoryUseCase.execute(category)).rejects.toBeInstanceOf(AppError);
  });
});
