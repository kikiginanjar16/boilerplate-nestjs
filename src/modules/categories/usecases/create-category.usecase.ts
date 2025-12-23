import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { createAuditFields } from 'src/common/utils/audit.util';
import { LoggedDto } from 'src/common/dtos/logged.dto';
import { Repository } from 'typeorm';

@Injectable()
export class CreateCategoryUseCase {
  constructor(
    @InjectRepository(Category)
    private readonly repository: Repository<Category>,
  ) {}

  async execute(body: any, logged: LoggedDto): Promise<Category> {
    createAuditFields(body, logged);
    return this.repository.save(body);
  }
}
