import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LoggedDto } from 'src/common/dtos/logged.dto';
import { updateAuditFields } from 'src/common/utils/audit.util';
import { Notification } from 'src/entities/notification.entity';

@Injectable()
export class ReadAllNotificationUseCase {
  constructor(
    @InjectRepository(Notification)
    private readonly repository: Repository<Notification>,
  ) {}

  async execute(logged: LoggedDto): Promise<void> {
    const payload: any = { is_read: 1 };
    updateAuditFields(payload, logged);
    await this.repository.update({ user_id: logged?.id }, payload);
  }
}
