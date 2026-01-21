import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { encryptText, hashText } from 'pii-cyclops';
import { Repository } from 'typeorm';

import { ADMIN, PII_ENCRYPTION_KEY } from 'src/common/constant/constant';
import { LoggedDto } from 'src/common/dtos/logged.dto';
import MessageHandler from 'src/common/message';
import { updateAuditFields } from 'src/common/utils/audit.util';
import { User } from 'src/entities/user.entity';
import { Common } from 'src/libraries/common';



@Injectable()
export class UpdateUserUseCase {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) { }

  async execute(id: string, body: any, logged: LoggedDto): Promise<any> {
    const data = await this.repository.findOneBy({ id: id });
    if (!data) {
      throw new Error(MessageHandler.ERR005);
    }

    if (logged?.role !== ADMIN && data.created_id && data.created_id !== logged?.id) {
      throw new Error(MessageHandler.ERR007);
    }

    if (body.email) {
      const email = body.email;
      const email_encrypted = encryptText(email, PII_ENCRYPTION_KEY).encrypted;
      const email_hash = hashText(email);
      body.email = email_encrypted;
      body.email_hash = email_hash;
    }

    if (body.phone) {
      const phone = body.phone;
      const phone_encrypted = encryptText(phone, PII_ENCRYPTION_KEY).encrypted;
      body.phone = phone_encrypted;
    }

    if (body.address) {
      const address = body.address;
      const address_encrypted = encryptText(address, PII_ENCRYPTION_KEY).encrypted;
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

    const saved = await this.repository.save(updated);
    delete saved.password;
    return saved;
  }
}
