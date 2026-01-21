import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemController } from './controllers/item.controller';
import { CreateItemUseCase } from './usecases/create-item.usecase';
import { GetItemUseCase } from './usecases/get-item.usecase';
import { UpdateItemUseCase } from './usecases/update-item.usecase';
import { DeleteItemUseCase } from './usecases/delete-item.usecase';
import { Item } from '../../entities/item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Item])],
  controllers: [ItemController],
  providers: [
    CreateItemUseCase,
    GetItemUseCase,
    UpdateItemUseCase,
    DeleteItemUseCase,
  ],
})
export class ItemModule {}