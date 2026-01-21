import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from '../../../entities/item.entity';
import { CreateItemDto } from '../dto/create-item.dto';

interface LoggedUser { id: string; name: string }

@Injectable()
export class CreateItemUseCase {
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
  ) {}

  async execute(createItemDto: CreateItemDto, logged?: LoggedUser): Promise<Item> {
    try {
      // Validate DTO
      if (!createItemDto) {
        throw new BadRequestException('CreateItemDto is required');
      }

      // Create entity with audit fields
      const item = this.itemRepository.create({
        ...createItemDto,
        created_by: logged?.name || 'system',
        created_id: logged?.id || null,
        updated_by: logged?.name || 'system',
        updated_id: logged?.id || null,
      });

      // Save entity
      return await this.itemRepository.save(item);
    } catch (error) {
      throw new BadRequestException(`Failed to create Item: ${error.message}`);
    }
  }
}