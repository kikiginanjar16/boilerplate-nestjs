import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from 'src/entities/notification.entity';
import { LoggedDto } from 'src/common/dtos/logged.dto';
import { assertOwnershipOrAdmin } from 'src/common/utils/ownership.util';
import { deleteAuditFields } from 'src/common/utils/audit.util';

@Injectable()
export class DeleteNotificationUseCase {
  constructor(
    @InjectRepository(Notification)
    private readonly repository: Repository<Notification>,
  ) {}

  async execute(id: string, logged: LoggedDto): Promise<void> {
    const existing = await this.repository.findOneBy({ id });
    assertOwnershipOrAdmin(existing, logged);
    const deleted = deleteAuditFields(logged, {});
    await this.repository.update(id, deleted);
  }
}
