import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ADMIN } from 'src/common/constant/constant';
import { LoggedDto } from 'src/common/dtos/logged.dto';
import MessageHandler from 'src/common/message';
import { deleteAuditFields } from 'src/common/utils/audit.util';
import { User } from 'src/entities/user.entity';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async execute(id: string, logged: LoggedDto): Promise<void> {
    const existing = await this.repository.findOneBy({ id });
    if (!existing) {
      throw new Error(MessageHandler.ERR005);
    }

    if (logged?.role !== ADMIN && existing.created_id && existing.created_id !== logged?.id) {
      throw new Error(MessageHandler.ERR007);
    }

    const deleted : any = deleteAuditFields(logged, {});
    await this.repository.update(id, deleted);
  }
}
