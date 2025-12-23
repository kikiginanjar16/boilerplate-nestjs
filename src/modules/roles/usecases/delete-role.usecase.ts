import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LoggedDto } from 'src/common/dtos/logged.dto';
import { deleteAuditFields } from 'src/common/utils/audit.util';
import { assertOwnershipOrAdmin } from 'src/common/utils/ownership.util';
import { Role } from 'src/entities/role.entity';

@Injectable()
export class DeleteRoleUseCase {
  constructor(
    @InjectRepository(Role)
    private readonly repository: Repository<Role>,
  ) {}

  async execute(id: string, logged: LoggedDto): Promise<void> {
    const existing = await this.repository.findOneBy({ id });
    assertOwnershipOrAdmin(existing, logged);
    const deleted = deleteAuditFields(logged, {});
    await this.repository.update(id, deleted);
  }
}
