import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from 'src/entities/blog.entity';
import MessageHandler from 'src/common/message';
import MinioClient from 'src/libraries/minio';

@Injectable()
export class BlogUseCase {
  constructor(
    @InjectRepository(Blog)
    private readonly repository: Repository<Blog>,
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
    const objectName = `blogs/${file.originalname}`;
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

    updated.image = uploaded;
    return this.repository.save(updated);
  }


  async create(file : any, body: any): Promise<any> {
    const objectName = `blogs/${file.originalname}`;
    const metaData: any = {
      'Content-Type': file.mimetype,
    };

    const uploaded: any = await new MinioClient().upload(
      objectName,
      file.buffer,
      metaData
    );

    body.image = uploaded;
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
