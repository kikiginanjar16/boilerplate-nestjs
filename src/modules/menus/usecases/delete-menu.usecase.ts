import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LoggedDto } from 'src/common/dtos/logged.dto';
import { deleteAuditFields } from 'src/common/utils/audit.util';
import { assertOwnershipOrAdmin } from 'src/common/utils/ownership.util';
import { Menu } from 'src/entities/menu.entity';

@Injectable()
export class DeleteMenuUseCase {
  constructor(
    @InjectRepository(Menu)
    private readonly repository: Repository<Menu>,
  ) {}

  async execute(id: string, logged: LoggedDto): Promise<void> {
    const existing = await this.repository.findOneBy({ id });
    assertOwnershipOrAdmin(existing, logged);
    const deleted = deleteAuditFields(logged, {});
    await this.repository.update(id, deleted);
  }
}
