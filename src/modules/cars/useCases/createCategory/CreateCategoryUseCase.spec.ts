import { AppError } from '../../../../shared/errors/AppError';
import { CategoriesRepositoryInMemory } from '../../repositories/in-memory/CategoriesRepositoryInMemory';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

describe('Create Category', () => {
  let categoriesRepository: CategoriesRepositoryInMemory;
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
