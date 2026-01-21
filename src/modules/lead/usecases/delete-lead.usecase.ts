import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead } from '../../../entities/lead.entity';

interface LoggedUser { id: string; name: string }

@Injectable()
export class DeleteLeadUseCase {
  constructor(
    @InjectRepository(Lead)
    private leadRepository: Repository<Lead>,
  ) {}

  async execute(id: string, logged?: LoggedUser): Promise<boolean> {
    try {
      if (!id) {
        throw new BadRequestException('ID is required');
      }

      // Check if entity exists and is not already soft-deleted
      const lead = await this.leadRepository.findOne({ where: { id, deleted_at: null } });
      if (!lead) {
        throw new NotFoundException(`Lead with ID ${id} not found or has been deleted`);
      }

      // Perform soft delete with audit fields
      const result = await this.leadRepository.softDelete({
        id,
        deleted_at: null,
      });

      if (result.affected > 0) {
        await this.leadRepository.update(id, {
          deleted_by: logged?.name || 'system',
          deleted_id: logged?.id || null,
        });
      }

      return result.affected > 0;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Failed to delete Lead: ${error.message}`);
    }
  }
}