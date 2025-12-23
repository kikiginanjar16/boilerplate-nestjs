import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ADMIN } from 'src/common/constant/constant';
import { LoggedDto } from 'src/common/dtos/logged.dto';
import { assertOwnershipOrAdmin } from 'src/common/utils/ownership.util';
import { Permission } from 'src/entities/permission.entity';

@Injectable()
export class GetPermissionUseCase {
  constructor(
    @InjectRepository(Permission)
    private readonly repository: Repository<Permission>,
  ) {}

  async paginate(page: number, limit: number, logged: LoggedDto): Promise<any> {
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

  async findOne(id: string, logged: LoggedDto): Promise<Permission> {
    const data = await this.repository.findOneBy({ id });
    assertOwnershipOrAdmin(data, logged);
    return data;
  }
}
