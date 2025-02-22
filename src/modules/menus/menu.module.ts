import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuController } from './menu.controller';
import { Menu } from 'src/entities/menu.entity';
import { MenuUseCase } from './usecases/menu.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Menu])],
  providers: [MenuUseCase],
  controllers: [MenuController],
})
export class MenuModule {}
