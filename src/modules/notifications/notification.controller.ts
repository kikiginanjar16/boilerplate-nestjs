import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { NotificationUseCase } from './usecases/notification.usecase';
import MessageHandler from 'src/common/message';
import { PaginateDto } from 'src/libraries/common/search.dto';
import logger from 'src/libraries/logger';
import { respond } from 'src/libraries/respond';
import { NotificationDto } from './dto/form.dto';

@Controller({ version: '1', path: 'notifications'})
export class NotificationController {
  constructor(private readonly notificationUseCase: NotificationUseCase) {}

  @Post()
  async create(@Res() res, @Body() body: NotificationDto): Promise<any> {
    try {
      const data = await this.notificationUseCase.create(body);
      return respond(res, 201, true, MessageHandler.SUC001, data);
    } catch (error) {
      logger.error('[Notification] ERROR', error);
      if (error.message) {
        return respond(res,400, false, error.message);
      }
      return respond(res,500, false, MessageHandler.ERR000);
    }
  }

  @Put(":id")
  async update(@Res() res, @Param('id') id: string, @Body() body: NotificationDto): Promise<any> {
    try {
      const data = await this.notificationUseCase.update(id, body);
      return respond(res,200, true, MessageHandler.SUC002, data);
    } catch (error) {
      logger.error('[Notification] ERROR', error);
      if (error.message) {
        return respond(res,400, false, error.message);
      }
      return respond(res,500, false, MessageHandler.ERR000);
    }
  }

  @Get()
  async findAll(@Res() res, @Query() query: PaginateDto): Promise<any[]> {
    try {
      const { page, limit } = query;
      const data: any = await this.notificationUseCase.paginate(page, limit);
      return respond(res,200, true, MessageHandler.SUC000, data);
    } catch (error) {
      logger.error('[Notification] ERROR', error);
      if (error.message) {
        return respond(res,400, false, error.message);
      }
      return respond(res,500, false, MessageHandler.ERR000);
    }
  }

  @Get(':id')
  async findOne(@Res() res, @Param('id') id: string): Promise<any> {
    try {
      const data = await this.notificationUseCase.findOne(id);
      return respond(res,200, true, MessageHandler.SUC000, data);
    } catch (error) {
      logger.error('[Notification] ERROR', error);
      if (error.message) {
        return respond(res,400, false, error.message);
      }
      return respond(res,500, false, MessageHandler.ERR000);
    }
  }

  @Delete(':id')
  async remove(@Res() res, @Param('id') id: string): Promise<void> {
    try {
      const data = await this.notificationUseCase.remove(id);
      return respond(res,200, true, MessageHandler.SUC003, data);
    } catch (error) {
      logger.error('[Notification] ERROR', error);
      if (error.message) {
        return respond(res,400, false, error.message);
      }
      return respond(res,500, false, MessageHandler.ERR000);
    }
  }
}
