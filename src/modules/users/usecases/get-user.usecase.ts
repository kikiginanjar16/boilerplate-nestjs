import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import MessageHandler from 'src/common/message';
import { LoggedDto } from 'src/common/dtos/logged.dto';
import { ADMIN } from 'src/common/constant/constant';

@Injectable()
export class GetUserUseCase {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async paginate(page: number, limit: number, whereCondition: any, logged: LoggedDto): Promise<any> {
    if (logged?.role !== ADMIN) {
      whereCondition.created_id = logged?.id;
    }

    const [result, total] = await this.repository.findAndCount({
      where: whereCondition,
      skip: (page - 1) * limit,
      take: limit,
    });

    for (let index = 0; index < result.length; index++) {
      const item: any = result[index];
      delete item.password;
    }

    return {
      data: result,
      meta: {
        count: total,
        page: page,
        total_page: Math.ceil(total / limit),
      }
    };
  }

  async findOne(id: string, logged: LoggedDto): Promise<User> {
    const data: any = await this.repository.findOneBy({ id: id });
    if (!data) {
      throw new Error(MessageHandler.ERR005);
    }

    delete data.password;
    if (logged?.role !== ADMIN && data.created_id && data.created_id !== logged?.id) {
      throw new Error(MessageHandler.ERR007);
    }

    return data;
  }
}
