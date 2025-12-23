import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LoggedDto } from 'src/common/dtos/logged.dto';
import { createAuditFields } from 'src/common/utils/audit.util';
import { Role } from 'src/entities/role.entity';

@Injectable()
export class CreateRoleUseCase {
  constructor(
    @InjectRepository(Role)
    private readonly repository: Repository<Role>,
  ) {}

  async execute(body: any, logged: LoggedDto): Promise<Role> {
    createAuditFields(body, logged);
    return this.repository.save(body);
  }
}
