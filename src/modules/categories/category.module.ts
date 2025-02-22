import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './category.controller';
import { Category } from 'src/entities/category.entity';
import { CategoryUseCase } from './usecases/category.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoryUseCase],
  controllers: [CategoryController],
})
export class CategoryModule {}
