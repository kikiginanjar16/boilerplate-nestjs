import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnnouncementController } from './announcement.controller';
import { Announcement } from 'src/entities/announcement.entity';
import { AnnouncementUseCase } from './usecases/announcement.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Announcement])],
  providers: [AnnouncementUseCase],
  controllers: [AnnouncementController],
})
export class AnnouncementModule {}
