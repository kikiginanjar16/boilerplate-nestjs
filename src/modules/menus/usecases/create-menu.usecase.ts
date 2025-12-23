import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from 'src/entities/menu.entity';
import { LoggedDto } from 'src/common/dtos/logged.dto';
import { createAuditFields } from 'src/common/utils/audit.util';

@Injectable()
export class CreateMenuUseCase {
  constructor(
    @InjectRepository(Menu)
    private readonly repository: Repository<Menu>,
  ) {}

  async execute(body: any, logged: LoggedDto): Promise<Menu> {
    createAuditFields(body, logged);
    return this.repository.save(body);
  }
}
