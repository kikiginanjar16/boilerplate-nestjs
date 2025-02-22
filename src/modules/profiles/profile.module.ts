import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { ProfileController } from './profile.controller';
import { ProfileUseCase } from './usecases/profile.usecase';
import { Category } from 'src/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Category])],
  providers: [ProfileUseCase],
  controllers: [ProfileController],
})
export class ProfileModule {}
