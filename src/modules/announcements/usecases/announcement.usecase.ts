import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Announcement } from 'src/entities/announcement.entity';
import MessageHandler from 'src/common/message';
import MinioClient from 'src/libraries/minio';

@Injectable()
export class AnnouncementUseCase {
  constructor(
    @InjectRepository(Announcement)
    private readonly repository: Repository<Announcement>,
  ) {}

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

  async update(id : string, body: any, file: any): Promise<any> {
    const objectName = `announcements/${file.originalname}`;
    const metaData: any = {
      'Content-Type': file.mimetype,
    };

    const uploaded: any = await new MinioClient().upload(
      objectName,
      file.buffer,
      metaData
    );

    const data = await this.repository.findOneBy({ id: id });
    if (!data) {
      throw new Error(MessageHandler.ERR005);
    }

    const updated = {
      ...data,
      ...body,
    };

    if(body?.is_published == 'true') {
      body.is_published = true;
    }else{
      body.is_published = false;
    }

    updated.content = uploaded;
    return this.repository.save(updated);
  }


  async create(file : any, body: any): Promise<any> {
    const objectName = `announcements/${file.originalname}`;
    const metaData: any = {
      'Content-Type': file.mimetype,
    };

    const uploaded: any = await new MinioClient().upload(
      objectName,
      file.buffer,
      metaData
    );

   
    if(body?.is_published == 'true') {
      body.is_published = true;
    }else{
      body.is_published = false;
    }

    body.content = uploaded;
    return this.repository.save(body);
  }

  async findAll(): Promise<any[]> {
    return this.repository.find();
  }

  async findOne(id: string): Promise<any> {
    return this.repository.findOneBy({ id: id });
  }
  
  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
