import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead } from '../../../entities/lead.entity';
import { UpdateLeadDto } from '../dto/update-lead.dto';

interface LoggedUser { id: string; name: string }

@Injectable()
export class UpdateLeadUseCase {
  constructor(
    @InjectRepository(Lead)
    private leadRepository: Repository<Lead>,
  ) {}

  async execute(id: string, updateLeadDto: UpdateLeadDto, logged?: LoggedUser): Promise<Lead> {
    try {
      // Validate inputs
      if (!id || !updateLeadDto) {
        throw new BadRequestException('ID and UpdateLeadDto are required');
      }

      // Check if entity exists and is not soft-deleted
      const lead = await this.leadRepository.findOne({ where: { id, deleted_at: null } });
      if (!lead) {
        throw new NotFoundException(`Lead with ID ${id} not found or has been deleted`);
      }

      // Update entity with audit fields
      await this.leadRepository.update(id, {
        ...updateLeadDto,
        updated_by: logged?.name || 'system',
        updated_id: logged?.id || null,
      });

      // Return updated entity
      return await this.leadRepository.findOne({ where: { id } });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Failed to update Lead: ${error.message}`);
    }
  }
}