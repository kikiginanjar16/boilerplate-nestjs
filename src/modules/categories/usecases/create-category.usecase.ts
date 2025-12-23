import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LoggedDto } from 'src/common/dtos/logged.dto';
import { createAuditFields } from 'src/common/utils/audit.util';
import { Category } from 'src/entities/category.entity';

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
