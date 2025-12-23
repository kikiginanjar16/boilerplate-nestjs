import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ADMIN } from 'src/common/constant/constant';
import { LoggedDto } from 'src/common/dtos/logged.dto';
import { assertOwnershipOrAdmin } from 'src/common/utils/ownership.util';
import { Notification } from 'src/entities/notification.entity';

@Injectable()
export class GetNotificationUseCase {
  constructor(
    @InjectRepository(Notification)
    private readonly repository: Repository<Notification>,
  ) {}

  async paginate(page = 1, limit = 10, logged: LoggedDto): Promise<any> {
    const where: any = {};
    if (logged?.role !== ADMIN) {
      where.created_id = logged?.id;
    }

    const [result, total] = await this.repository.findAndCount({
      where,
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: result,
      meta: {
        count: total,
        page: page,
        total_page: Math.ceil(total / limit),
      }
    };
  }

  async me(page = 1, limit = 10, logged: LoggedDto): Promise<any> {
    const [result, total] = await this.repository.findAndCount({
      where: { user_id: logged?.id },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: result,
      meta: {
        count: total,
        page: page,
        total_page: Math.ceil(total / limit),
      }
    };
  }

  async findOne(id: string, logged: LoggedDto): Promise<Notification> {
    const data = await this.repository.findOneBy({ id: id });
    assertOwnershipOrAdmin(data, logged);
    return data;
  }
}
