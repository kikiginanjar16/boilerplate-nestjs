import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Like, Repository } from 'typeorm';
import MessageHandler from 'src/common/message';
import { UserDto } from '../dto/form.dto';
import Constant from 'src/common/constant';
import { Common } from 'src/libraries/common';
import { LoggedDto } from 'src/common/dtos/logged.dto';
import { createAuditFields, deleteAuditFields, updateAuditFields } from 'src/common/utils/audit.util';
import { encryptText, hashText } from 'pii-cyclops';

@Injectable()
export class UserUseCase {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async create(createUserDto: UserDto, logged: LoggedDto): Promise<User> {
    const name = createUserDto.name;
    const email = encryptText(createUserDto.email, Constant.JWT_SECRET).encrypted;
    const phone = encryptText(createUserDto.phone, Constant.JWT_SECRET).encrypted;
    const address = encryptText(createUserDto.address, Constant.JWT_SECRET).encrypted;

    const user = new User();
    user.name = name;
    user.email = email;
    user.phone = phone;
    user.address = address;
    user.avatar = Constant.DEFAULT_AVATAR;
    user.password = await new Common().hashPassword(createUserDto.password);
    createAuditFields(user, logged);
    return this.repository.save(user);
  }

  async paginate(page: number, limit: number, whereCondition : any): Promise<any> {
    const [result, total] = await this.repository.findAndCount({
      where: whereCondition,
      skip: (page - 1) * limit,
      take: limit,
    });

    for (let index = 0; index < result.length; index++) {
      const item = result[index];
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

  async update(id : string, body: any, logged: LoggedDto): Promise<any> {
    const data = await this.repository.findOneBy({ id: id });
    if (!data) {
      throw new Error(MessageHandler.ERR005);
    }

    if(body.email){
      const email = body.email;
      const email_encrypted = encryptText(email, Constant.JWT_SECRET).encrypted;
      const email_hash = hashText(email);
      body.email = email_encrypted;
      body.email_hash = email_hash;
    }

    if(body.phone){
      const phone = body.phone;
      const phone_encrypted  = encryptText(phone, Constant.JWT_SECRET).encrypted;
      body.phone = phone_encrypted;
    }

    if(body.address){
      const address = body.address;
      const address_encrypted = encryptText(address, Constant.JWT_SECRET).encrypted;
      body.address = address_encrypted;
    }

    updateAuditFields(body, logged);
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
    const data = await this.repository.findOneBy({ id: id });
    if (!data) {
      throw new Error(MessageHandler.ERR005);
    }

    delete data.password;
    return data;
  }
  
  async remove(id: string, logged: LoggedDto): Promise<void> {
    const deleted : any = deleteAuditFields(logged);
    await this.repository.update(id, deleted);
  }
}
