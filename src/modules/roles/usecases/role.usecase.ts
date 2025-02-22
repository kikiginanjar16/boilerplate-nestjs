import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from 'src/entities/role.entity';
import MessageHandler from 'src/common/message';

@Injectable()
export class RoleUseCase {
  constructor(
    @InjectRepository(Role)
    private readonly repository: Repository<Role>,
  ) {}

  async create(body: any): Promise<any> {
    return this.repository.save(body);
  }

  async paginate(page: number = 1, limit: number = 10): Promise<any> {
    const [result, total] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: result,
      meta : {
        count: total,
        page: page,
        total_page: Math.ceil(total / limit),
      }
    };
  }

  async update(id : string, body: any): Promise<any> {
    const data = await this.repository.findOneBy({ id: id });
    if (!data) {
      throw new Error(MessageHandler.ERR005);
    }

    const updated = {
      ...data,
      ...body,
    };

    return this.repository.save(updated);
  }

  async findOne(id: string): Promise<any> {
    return this.repository.findOneBy({ id: id });
  }
  
  async remove(id: string): Promise<any> {
    await this.repository.delete(id);
    return MessageHandler.OK;
  }
}
