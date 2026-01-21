import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead } from '../../../entities/lead.entity';

interface LoggedUser { id: string; name: string }

@Injectable()
export class GetLeadUseCase {
  constructor(
    @InjectRepository(Lead)
    private leadRepository: Repository<Lead>,
  ) {}

  async execute(id: string, relations: string[] = [], logged?: LoggedUser): Promise<Lead | null> {
    try {
      if (!id) {
        throw new BadRequestException('ID is required');
      }

      const lead = await this.leadRepository.findOne({ 
        where: { id, deleted_at: null },
        relations,
      });

      if (!lead) {
        throw new NotFoundException(`Lead with ID ${id} not found or has been deleted`);
      }

      return lead;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Failed to retrieve Lead: ${error.message}`);
    }
  }

  async paginate(
    page = 1,
    limit = 10,
    filters: any = {},
    relations: string[] = [],
    logged?: LoggedUser
  ): Promise<{ data: Lead[], meta : { total: number; page: number; total_page: number } }> {
    try {
      if (page < 1 || limit < 1) {
        throw new BadRequestException('Page and limit must be positive numbers');
      }

      const where = { ...filters, deleted_at: null };
      const [data, total] = await this.leadRepository.findAndCount({
        where,
        relations,
        order: { 'created_at': 'DESC' },
        skip: (page - 1) * limit,
        take: limit,
      });

      const total_page = Math.ceil(total / limit);

      return {
        data,
        meta:{
          total,
          page,
          total_page
        }
      };
    } catch (error) {
      throw new BadRequestException(`Failed to retrieve Leads: ${error.message}`);
    }
  }
}