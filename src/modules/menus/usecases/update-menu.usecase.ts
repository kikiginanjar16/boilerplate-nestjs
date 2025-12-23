import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LoggedDto } from 'src/common/dtos/logged.dto';
import MessageHandler from 'src/common/message';
import { updateAuditFields } from 'src/common/utils/audit.util';
import { assertOwnershipOrAdmin } from 'src/common/utils/ownership.util';
import { Menu } from 'src/entities/menu.entity';

@Injectable()
export class UpdateMenuUseCase {
  constructor(
    @InjectRepository(Menu)
    private readonly repository: Repository<Menu>,
  ) {}

  async execute(id: string, body: any, logged: LoggedDto): Promise<Menu> {
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
