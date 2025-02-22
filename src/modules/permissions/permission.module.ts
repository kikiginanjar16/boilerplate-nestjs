import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionController } from './permission.controller';
import { Permission } from 'src/entities/permission.entity';
import { PermissionUseCase } from './usecases/permission.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  providers: [PermissionUseCase],
  controllers: [PermissionController],
})
export class PermissionModule {}
