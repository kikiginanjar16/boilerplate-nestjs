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
import MessageHandler from 'src/common/message';
import { PaginateDto } from 'src/libraries/common/search.dto';
import logger from 'src/libraries/logger';
import { respond } from 'src/libraries/respond';
import { NotificationDto } from './dto/form.dto';
import { ApiBearerAuth, ApiProperty } from '@nestjs/swagger';
import { JWT_ACCESS_TOKEN } from 'src/common/constant/constant';
import { CreateNotificationUseCase } from './usecases/create-notification.usecase';
import { GetNotificationUseCase } from './usecases/get-notification.usecase';
import { UpdateNotificationUseCase } from './usecases/update-notification.usecase';
import { DeleteNotificationUseCase } from './usecases/delete-notification.usecase';
import { ReadNotificationUseCase } from './usecases/read-notification.usecase';
import { ReadAllNotificationUseCase } from './usecases/readall-notification.usecase';

@Controller({ version: '1', path: 'notifications'})
@ApiBearerAuth(JWT_ACCESS_TOKEN)
export class NotificationController {
  constructor(
    private readonly createNotificationUseCase: CreateNotificationUseCase,
    private readonly getNotificationUseCase: GetNotificationUseCase,
    private readonly updateNotificationUseCase: UpdateNotificationUseCase,
    private readonly deleteNotificationUseCase: DeleteNotificationUseCase,
    private readonly readNotificationUseCase: ReadNotificationUseCase,
    private readonly readAllNotificationUseCase: ReadAllNotificationUseCase,
  ) {}

  @Post()
  async create(@Res() res, @Body() body: NotificationDto): Promise<any> {
    try {
      const logged = res.locals.logged;
      const data : any = await this.createNotificationUseCase.execute(body, logged);
      return respond(res, 201, true, MessageHandler.SUC001, data?.data, data?.meta);
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
      const logged = res.locals.logged;
      const data = await this.updateNotificationUseCase.execute(id, body, logged);
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
  @ApiProperty({ type: () => PaginateDto })
  async findAll(@Res() res, @Query() query: PaginateDto): Promise<any[]> {
    try {
      const { page, limit } = query;
      const logged = res.locals.logged;
      const data: any = await this.getNotificationUseCase.paginate(page, limit, logged);
      return respond(res,200, true, MessageHandler.SUC000, data);
    } catch (error) {
      logger.error('[Notification] ERROR', error);
      if (error.message) {
        return respond(res,400, false, error.message);
      }
      return respond(res,500, false, MessageHandler.ERR000);
    }
  }

  @Get('/my')
  @ApiProperty({ type: () => PaginateDto })
  async me(@Res() res, @Query() query: PaginateDto): Promise<any[]> {
    try {
      const { page, limit } = query;
      const logged = res.locals.logged;
      const data: any = await this.getNotificationUseCase.me(page, limit, logged);
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
      const logged = res.locals.logged;
      const data = await this.getNotificationUseCase.findOne(id, logged);
      return respond(res,200, true, MessageHandler.SUC000, data);
    } catch (error) {
      logger.error('[Notification] ERROR', error);
      if (error.message) {
        return respond(res,400, false, error.message);
      }
      return respond(res,500, false, MessageHandler.ERR000);
    }
  }

  @Put(':id/read')
  async read(@Res() res, @Param('id') id: string): Promise<any> {
    try {
      const logged = res.locals.logged;
      const data = await this.readNotificationUseCase.execute(id, logged);
      return respond(res,200, true, MessageHandler.SUC002, data);
    } catch (error) {
      logger.error('[Notification] ERROR', error);
      if (error.message) {
        return respond(res,400, false, error.message);
      }
      return respond(res,500, false, MessageHandler.ERR000);
    }
  }

  @Put('read-all')
  async readAll(@Res() res): Promise<any> {
    try {
      const logged = res.locals.logged;
      await this.readAllNotificationUseCase.execute(logged);
      return respond(res,200, true, MessageHandler.SUC002, null);
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
      const logged = res.locals.logged;
      const data = await this.deleteNotificationUseCase.execute(id, logged);
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
