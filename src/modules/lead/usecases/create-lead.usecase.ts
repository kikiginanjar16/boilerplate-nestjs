import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead } from '../../../entities/lead.entity';
import { CreateLeadDto } from '../dto/create-lead.dto';

interface LoggedUser { id: string; name: string }

@Injectable()
export class CreateLeadUseCase {
  constructor(
    @InjectRepository(Lead)
    private leadRepository: Repository<Lead>,
  ) {}

  async execute(createLeadDto: CreateLeadDto, logged?: LoggedUser): Promise<Lead> {
    try {
      // Validate DTO
      if (!createLeadDto) {
        throw new BadRequestException('CreateLeadDto is required');
      }

      // Create entity with audit fields
      const lead = this.leadRepository.create({
        ...createLeadDto,
        created_by: logged?.name || 'system',
        created_id: logged?.id || null,
        updated_by: logged?.name || 'system',
        updated_id: logged?.id || null,
      });

      // Save entity
      return await this.leadRepository.save(lead);
    } catch (error) {
      throw new BadRequestException(`Failed to create Lead: ${error.message}`);
    }
  }
}