import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import MessageHandler from 'src/common/message';
import { UserDto } from '../dto/form.dto';
import Constant from 'src/common/constant';
import { Common } from 'src/libraries/common';

@Injectable()
export class UserUseCase {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async create(createUserDto: UserDto): Promise<User> {
    createUserDto.avatar = Constant.DEFAULT_AVATAR;
    createUserDto.password = await new Common().hashPassword(createUserDto.password);
    return this.repository.save(createUserDto);
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

    if (body.password) {
      updated.password = await new Common().hashPassword(body.password);
    }

    return this.repository.save(updated);
  }

  async findOne(id: string): Promise<User> {
    return this.repository.findOneBy({ id: id });
  }
  
  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
