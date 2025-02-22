import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationController } from './notification.controller';
import { Notification } from 'src/entities/notification.entity';
import { NotificationUseCase } from './usecases/notification.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Notification])],
  providers: [NotificationUseCase],
  controllers: [NotificationController],
})
export class NotificationModule {}
