import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LoggedDto } from 'src/common/dtos/logged.dto';
import { createAuditFields } from 'src/common/utils/audit.util';
import { Permission } from 'src/entities/permission.entity';

@Injectable()
export class CreatePermissionUseCase {
  constructor(
    @InjectRepository(Permission)
    private readonly repository: Repository<Permission>,
  ) {}

  async execute(body: any, logged: LoggedDto): Promise<Permission> {
    createAuditFields(body, logged);
    return this.repository.save(body);
  }
}
