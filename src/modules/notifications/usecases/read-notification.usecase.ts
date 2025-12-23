import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ADMIN } from 'src/common/constant/constant';
import { LoggedDto } from 'src/common/dtos/logged.dto';
import MessageHandler from 'src/common/message';
import { updateAuditFields } from 'src/common/utils/audit.util';
import { Notification } from 'src/entities/notification.entity';

@Injectable()
export class ReadNotificationUseCase {
  constructor(
    @InjectRepository(Notification)
    private readonly repository: Repository<Notification>,
  ) {}

  private assertCanAccess(notification: Notification, logged: LoggedDto): void {
    if (!notification) {
      throw new Error(MessageHandler.ERR005);
    }

    if (logged?.role === ADMIN) {
      return;
    }

    if (notification.user_id && notification.user_id !== logged?.id) {
      throw new Error(MessageHandler.ERR007);
    }

    if (notification.created_id && notification.created_id !== logged?.id) {
      throw new Error(MessageHandler.ERR007);
    }
  }

  async execute(id: string, logged: LoggedDto): Promise<Notification> {
    const data = await this.repository.findOneBy({ id });
    this.assertCanAccess(data, logged);

    data.is_read = 1;
    updateAuditFields(data, logged);

    return this.repository.save(data);
  }
}
