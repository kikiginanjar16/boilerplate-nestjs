import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { assertOwnershipOrAdmin } from 'src/common/utils/ownership.util';
import { deleteAuditFields } from 'src/common/utils/audit.util';
import { LoggedDto } from 'src/common/dtos/logged.dto';
import { Repository } from 'typeorm';

@Injectable()
export class DeleteCategoryUseCase {
  constructor(
    @InjectRepository(Category)
    private readonly repository: Repository<Category>,
  ) {}

  async execute(id: string, logged: LoggedDto): Promise<void> {
    const existing = await this.repository.findOneBy({ id });
    assertOwnershipOrAdmin(existing, logged);
    const deleted = deleteAuditFields(logged, {});
    await this.repository.update(id, deleted);
  }
}
