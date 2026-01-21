import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from '../../../entities/item.entity';

interface LoggedUser { id: string; name: string }

@Injectable()
export class DeleteItemUseCase {
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
  ) {}

  async execute(id: string, logged?: LoggedUser): Promise<boolean> {
    try {
      if (!id) {
        throw new BadRequestException('ID is required');
      }

      // Check if entity exists and is not already soft-deleted
      const item = await this.itemRepository.findOne({ where: { id, deleted_at: null } });
      if (!item) {
        throw new NotFoundException(`Item with ID ${id} not found or has been deleted`);
      }

      // Perform soft delete with audit fields
      const result = await this.itemRepository.softDelete({
        id,
        deleted_at: null,
      });

      if (result.affected > 0) {
        await this.itemRepository.update(id, {
          deleted_by: logged?.name || 'system',
          deleted_id: logged?.id || null,
        });
      }

      return result.affected > 0;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Failed to delete Item: ${error.message}`);
    }
  }
}