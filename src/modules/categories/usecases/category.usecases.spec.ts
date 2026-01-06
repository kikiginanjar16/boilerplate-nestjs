/* eslint-disable @typescript-eslint/no-unused-vars */
 
import { Repository } from 'typeorm';

import { CreateCategoryUseCase } from './create-category.usecase';
import { DeleteCategoryUseCase } from './delete-category.usecase';
import { GetCategoryUseCase } from './get-category.usecase';
import { UpdateCategoryUseCase } from './update-category.usecase';
import MessageHandler from '../../../common/message';
import { Category } from '../../../entities/category.entity';

type MockRepo<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const makeRepo = (): MockRepo<Category> => ({
  save: jest.fn(),
  findAndCount: jest.fn(),
  findOneBy: jest.fn(),
  update: jest.fn(),
});

const loggedAdmin = { id: 'admin-id', role: 'admin', name: 'Admin' } as any;
const loggedUser = { id: 'user-id', role: 'user', name: 'User' } as any;

describe('Category use cases', () => {
  describe('CreateCategoryUseCase', () => {
    it('should save with audit fields', async () => {
      const repo = makeRepo();
      repo.save!.mockImplementation(async (body) => body);
      const usecase = new CreateCategoryUseCase(repo as unknown as Repository<Category>);

      const payload = { title: 't', label: 'l' } as any;
      const result = await usecase.execute(payload, loggedUser);

      expect(repo.save).toHaveBeenCalledTimes(1);
      const savedArg = repo.save!.mock.calls[0][0];
      expect(savedArg.created_id).toBe(loggedUser.id);
      expect(savedArg.updated_id).toBe(loggedUser.id);
      expect(result.created_by).toBe(loggedUser.name);
    });
  });

  describe('GetCategoryUseCase', () => {
    it('should filter by created_id for non-admin', async () => {
      const repo = makeRepo();
      repo.findAndCount!.mockResolvedValue([[], 0]);
      const usecase = new GetCategoryUseCase(repo as unknown as Repository<Category>);

      await usecase.paginate(1, 10, loggedUser);

      expect(repo.findAndCount).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ created_id: loggedUser.id }),
        }),
      );
    });

    it('should throw when user tries to access others item', async () => {
      const repo = makeRepo();
      repo.findOneBy!.mockResolvedValue({ id: '1', created_id: 'other' });
      const usecase = new GetCategoryUseCase(repo as unknown as Repository<Category>);

      await expect(usecase.findOne('1', loggedUser)).rejects.toThrow(
        MessageHandler.ERR007,
      );
    });
  });

  describe('UpdateCategoryUseCase', () => {
    it('should update and apply audit', async () => {
      const repo = makeRepo();
      repo.findOneBy!.mockResolvedValue({ id: '1', created_id: loggedUser.id });
      repo.save!.mockImplementation(async (body) => body);
      const usecase = new UpdateCategoryUseCase(repo as unknown as Repository<Category>);

      const body = { label: 'updated' };
      const result = await usecase.execute('1', body, loggedUser);

      expect(repo.save).toHaveBeenCalledTimes(1);
      expect(result.updated_by).toBe(loggedUser.name);
    });

    it('should reject update on foreign record', async () => {
      const repo = makeRepo();
      repo.findOneBy!.mockResolvedValue({ id: '1', created_id: 'other' });
      const usecase = new UpdateCategoryUseCase(repo as unknown as Repository<Category>);

      await expect(usecase.execute('1', {}, loggedUser)).rejects.toThrow(
        MessageHandler.ERR007,
      );
    });
  });

  describe('DeleteCategoryUseCase', () => {
    it('should soft-delete with audit fields', async () => {
      const repo = makeRepo();
      repo.findOneBy!.mockResolvedValue({ id: '1', created_id: loggedUser.id });
      const usecase = new DeleteCategoryUseCase(repo as unknown as Repository<Category>);

      await usecase.execute('1', loggedUser);

      expect(repo.update).toHaveBeenCalledTimes(1);
      const [, payload] = repo.update!.mock.calls[0];
      expect(payload.deleted_id).toBe(loggedUser.id);
      expect(payload.deleted_at).toBeInstanceOf(Date);
    });
  });
});
