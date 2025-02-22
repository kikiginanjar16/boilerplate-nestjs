import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { UsersController } from './users.controller';
import { UserUseCase } from './usecases/users.usecase';
import { Category } from 'src/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Category])],
  providers: [UserUseCase],
  controllers: [UsersController],
})
export class UsersModule {}
