import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Notification } from 'src/entities/notification.entity';

import { NotificationController } from './notification.controller';
import { CreateNotificationUseCase } from './usecases/create-notification.usecase';
import { DeleteNotificationUseCase } from './usecases/delete-notification.usecase';
import { GetNotificationUseCase } from './usecases/get-notification.usecase';
import { ReadNotificationUseCase } from './usecases/read-notification.usecase';
import { ReadAllNotificationUseCase } from './usecases/readall-notification.usecase';
import { UpdateNotificationUseCase } from './usecases/update-notification.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Notification])],
  providers: [CreateNotificationUseCase, GetNotificationUseCase, UpdateNotificationUseCase, DeleteNotificationUseCase, ReadNotificationUseCase, ReadAllNotificationUseCase],
  controllers: [NotificationController],
})
export class NotificationModule {}
