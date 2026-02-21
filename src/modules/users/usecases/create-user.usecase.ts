import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { encryptText, hashText } from 'pii-cyclops';
import { Repository } from 'typeorm';

import Constant from 'src/common/constant';
import { PII_ENCRYPTION_KEY } from 'src/common/constant/constant';
import { LoggedDto } from 'src/common/dtos/logged.dto';
import { createAuditFields } from 'src/common/utils/audit.util';
import { User } from 'src/entities/user.entity';
import { Common } from 'src/libraries/common';

import { UserDto } from '../dto/form.dto';


@Injectable()
export class CreateUserUseCase {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) { }

  async execute(createUserDto: UserDto, logged: LoggedDto): Promise<User> {
    const name = createUserDto.name;
    const email = encryptText(createUserDto.email, PII_ENCRYPTION_KEY).encrypted;
    const phone = encryptText(createUserDto.phone, PII_ENCRYPTION_KEY).encrypted;
    const address = encryptText(createUserDto.address, PII_ENCRYPTION_KEY).encrypted;

    const user = new User();
    user.name = name;
    user.email = email;
    user.phone = phone;
    user.address = address;
    user.avatar = Constant.DEFAULT_AVATAR;
    user.password = await new Common().hashPassword(createUserDto.password);
    user.email_hash = hashText(createUserDto.email);
    createAuditFields(user, logged);
    const saved = await this.repository.save(user);
    delete saved.password;
    return saved;
  }
}
