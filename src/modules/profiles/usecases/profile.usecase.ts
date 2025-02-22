import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import MessageHandler from 'src/common/message';
import { Common } from 'src/libraries/common';
import MinioClient from 'src/libraries/minio';

@Injectable()
export class ProfileUseCase {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>
  ) { }

  async update(id: string, body: any): Promise<any> {
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

  async findOne(id: string): Promise<any> {
    const data =  await this.repository.findOneBy({ id: id });
    if (!data) {
      throw new Error(MessageHandler.ERR005);
    }

    delete data.password;
    return data;
  }

  async uploadAvatar(id: string, file: any): Promise<any> {
    try {
      const data = await this.repository.findOneBy({ id: id });
      if (!data) {
        throw new Error(MessageHandler.ERR005);
      }

      const objectName = `avatar/${id}-${file.originalname}`;
      const metaData: any = {
        'Content-Type': file.mimetype,
      };

      const uploaded: any = await new MinioClient().upload(
        objectName,
        file.buffer,
        metaData
      )

      console.log(uploaded);
      return this.repository.update({
        id: id,
      }, {
        avatar: uploaded.url
      });
    } catch (error) {
      throw error;
    }
  }
}
