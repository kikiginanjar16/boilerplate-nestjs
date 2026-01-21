import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from '../../../entities/item.entity';
import { UpdateItemDto } from '../dto/update-item.dto';

interface LoggedUser { id: string; name: string }

@Injectable()
export class UpdateItemUseCase {
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
  ) {}

  async execute(id: string, updateItemDto: UpdateItemDto, logged?: LoggedUser): Promise<Item> {
    try {
      // Validate inputs
      if (!id || !updateItemDto) {
        throw new BadRequestException('ID and UpdateItemDto are required');
      }

      // Check if entity exists and is not soft-deleted
      const item = await this.itemRepository.findOne({ where: { id, deleted_at: null } });
      if (!item) {
        throw new NotFoundException(`Item with ID ${id} not found or has been deleted`);
      }

      // Update entity with audit fields
      await this.itemRepository.update(id, {
        ...updateItemDto,
        updated_by: logged?.name || 'system',
        updated_id: logged?.id || null,
      });

      // Return updated entity
      return await this.itemRepository.findOne({ where: { id } });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Failed to update Item: ${error.message}`);
    }
  }
}