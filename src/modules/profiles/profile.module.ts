import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Category } from 'src/entities/category.entity';

import { ProfileController } from './profile.controller';
import { ProfileUseCase } from './usecases/profile.usecase';
import { User } from '../../entities/user.entity';


@Module({
  imports: [TypeOrmModule.forFeature([User, Category])],
  providers: [ProfileUseCase],
  controllers: [ProfileController],
})
export class ProfileModule {}
