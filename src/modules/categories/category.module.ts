import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './category.controller';
import { Category } from 'src/entities/category.entity';
import { CreateCategoryUseCase } from './usecases/create-category.usecase';
import { GetCategoryUseCase } from './usecases/get-category.usecase';
import { UpdateCategoryUseCase } from './usecases/update-category.usecase';
import { DeleteCategoryUseCase } from './usecases/delete-category.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CreateCategoryUseCase, GetCategoryUseCase, UpdateCategoryUseCase, DeleteCategoryUseCase],
  controllers: [CategoryController],
})
export class CategoryModule {}
