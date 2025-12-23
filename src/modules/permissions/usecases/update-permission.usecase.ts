import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from 'src/entities/permission.entity';
import MessageHandler from 'src/common/message';
import { LoggedDto } from 'src/common/dtos/logged.dto';
import { assertOwnershipOrAdmin } from 'src/common/utils/ownership.util';
import { updateAuditFields } from 'src/common/utils/audit.util';

@Injectable()
export class UpdatePermissionUseCase {
  constructor(
    @InjectRepository(Permission)
    private readonly repository: Repository<Permission>,
  ) {}

  async execute(id: string, body: any, logged: LoggedDto): Promise<Permission> {
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
