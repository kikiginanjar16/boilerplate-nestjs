import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from 'src/entities/notification.entity';
import MessageHandler from 'src/common/message';
import { LoggedDto } from 'src/common/dtos/logged.dto';
import { assertOwnershipOrAdmin } from 'src/common/utils/ownership.util';
import { updateAuditFields } from 'src/common/utils/audit.util';

@Injectable()
export class UpdateNotificationUseCase {
  constructor(
    @InjectRepository(Notification)
    private readonly repository: Repository<Notification>,
  ) {}

  async execute(id: string, body: any, logged: LoggedDto): Promise<Notification> {
    const data = await this.repository.findOneBy({ id: id });
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
