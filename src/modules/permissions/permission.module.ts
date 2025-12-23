import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Permission } from 'src/entities/permission.entity';

import { PermissionController } from './permission.controller';
import { CreatePermissionUseCase } from './usecases/create-permission.usecase';
import { DeletePermissionUseCase } from './usecases/delete-permission.usecase';
import { GetPermissionUseCase } from './usecases/get-permission.usecase';
import { UpdatePermissionUseCase } from './usecases/update-permission.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  providers: [CreatePermissionUseCase, GetPermissionUseCase, UpdatePermissionUseCase, DeletePermissionUseCase],
  controllers: [PermissionController],
})
export class PermissionModule {}
