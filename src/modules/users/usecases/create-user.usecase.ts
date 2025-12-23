import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { UserDto } from '../dto/form.dto';
import Constant from 'src/common/constant';
import { Common } from 'src/libraries/common';
import { LoggedDto } from 'src/common/dtos/logged.dto';
import { createAuditFields } from 'src/common/utils/audit.util';
import { encryptText, hashText } from 'pii-cyclops';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async execute(createUserDto: UserDto, logged: LoggedDto): Promise<User> {
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
    user.email_hash = hashText(createUserDto.email);
    createAuditFields(user, logged);
    const saved = await this.repository.save(user);
    delete saved.password;
    return saved;
  }
}
