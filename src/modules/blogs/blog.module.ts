import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogController } from './blog.controller';
import { Blog } from 'src/entities/blog.entity';
import { BlogUseCase } from './usecases/blog.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Blog])],
  providers: [BlogUseCase],
  controllers: [BlogController],
})
export class BlogModule {}
