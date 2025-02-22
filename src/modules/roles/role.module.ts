import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleController } from './role.controller';
import { Role } from 'src/entities/role.entity';
import { RoleUseCase } from './usecases/role.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [RoleUseCase],
  controllers: [RoleController],
})
export class RoleModule {}
