import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { UsersController } from './users.controller';
import { Category } from 'src/entities/category.entity';
import { CreateUserUseCase } from './usecases/create-user.usecase';
import { GetUserUseCase } from './usecases/get-user.usecase';
import { UpdateUserUseCase } from './usecases/update-user.usecase';
import { DeleteUserUseCase } from './usecases/delete-user.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([User, Category])],
  providers: [CreateUserUseCase, GetUserUseCase, UpdateUserUseCase, DeleteUserUseCase],
  controllers: [UsersController],
})
export class UsersModule {}
