import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleController } from './role.controller';
import { Role } from 'src/entities/role.entity';
import { CreateRoleUseCase } from './usecases/create-role.usecase';
import { GetRoleUseCase } from './usecases/get-role.usecase';
import { UpdateRoleUseCase } from './usecases/update-role.usecase';
import { DeleteRoleUseCase } from './usecases/delete-role.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [CreateRoleUseCase, GetRoleUseCase, UpdateRoleUseCase, DeleteRoleUseCase],
  controllers: [RoleController],
})
export class RoleModule {}
