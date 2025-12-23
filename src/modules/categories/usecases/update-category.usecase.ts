import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import MessageHandler from 'src/common/message';
import { assertOwnershipOrAdmin } from 'src/common/utils/ownership.util';
import { updateAuditFields } from 'src/common/utils/audit.util';
import { LoggedDto } from 'src/common/dtos/logged.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UpdateCategoryUseCase {
  constructor(
    @InjectRepository(Category)
    private readonly repository: Repository<Category>,
  ) {}

  async execute(id: string, body: any, logged: LoggedDto): Promise<Category> {
    const data = await this.repository.findOneBy({ id });
    if (!data) {
      throw new Error(MessageHandler.ERR005);
    }

    assertOwnershipOrAdmin(data, logged);
    updateAuditFields(body, logged);

    const updated = {
      ...data,
      ...body,
    };

    return this.repository.save(updated);
  }
}
