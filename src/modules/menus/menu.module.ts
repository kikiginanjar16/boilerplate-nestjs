import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Menu } from 'src/entities/menu.entity';

import { MenuController } from './menu.controller';
import { CreateMenuUseCase } from './usecases/create-menu.usecase';
import { DeleteMenuUseCase } from './usecases/delete-menu.usecase';
import { GetMenuUseCase } from './usecases/get-menu.usecase';
import { UpdateMenuUseCase } from './usecases/update-menu.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Menu])],
  providers: [CreateMenuUseCase, GetMenuUseCase, UpdateMenuUseCase, DeleteMenuUseCase],
  controllers: [MenuController],
})
export class MenuModule {}
