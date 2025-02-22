import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AnnouncementUseCase } from './usecases/announcement.usecase';
import MessageHandler from 'src/common/message';
import logger from 'src/libraries/logger';
import { respond } from 'src/libraries/respond';
import { PaginateDto } from 'src/libraries/common/search.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller({ version: '1', path: 'announcements' })
export class AnnouncementController {
  constructor(private readonly AnnouncementUseCase: AnnouncementUseCase) { }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Res() res,
    @Body() body: any,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 2 * 1000 * 1024 }),
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
        fileIsRequired: false,
      }),
    ) file: Express.Multer.File): Promise<any> {
    try {
      const data = await this.AnnouncementUseCase.create(file, body);
      return respond(res, 201, true, MessageHandler.SUC002, data);
    } catch (error) {
      logger.error('[Announcement] ERROR', error);
      if (error.message) {
        return respond(res, 400, false, error.message);
      }
      return respond(res, 500, false, MessageHandler.ERR000);
    }
  }

  @Put(":id")
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Res() res, 
    @Param('id') id: string, 
    @Body() body: any,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 2 * 1000 * 1024 }),
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
      }),
    ) file: Express.Multer.File): Promise<any> {
    try {
      const data = await this.AnnouncementUseCase.update(id, body, file);
      return respond(res, 200, true, MessageHandler.SUC002, data);
    } catch (error) {
      logger.error('[Announcement] ERROR', error);
      if (error.message) {
        return respond(res, 400, false, error.message);
      }
      return respond(res, 500, false, MessageHandler.ERR000);
    }
  }

  @Get()
  async findAll(@Res() res, @Query() query: PaginateDto): Promise<any[]> {
    try {
      const { page, limit } = query;
      const data: any = await this.AnnouncementUseCase.paginate(page, limit);
      return respond(res, 200, true, MessageHandler.SUC002, data.data, data.meta);
    } catch (error) {
      logger.error('[Announcement] ERROR', error);
      if (error.message) {
        return respond(res, 400, false, error.message);
      }
      return respond(res, 500, false, MessageHandler.ERR000);
    }
  }

  @Get(':id')
  async findOne(
    @Res() res, 
    @Param('id') id: string
  ): Promise<any> {
    try {
      const data = await this.AnnouncementUseCase.findOne(id);
      return respond(res, 200, true, MessageHandler.SUC000, data);
    } catch (error) {
      logger.error('[Announcement] ERROR', error);
      if (error.message) {
        return respond(res, 400, false, error.message);
      }
      return respond(res, 500, false, MessageHandler.ERR000);
    }
  }

  @Delete(':id')
  async remove(
    @Res() res, 
    @Param('id') id: string
  ): Promise<void> {
    try {
      const data = await this.AnnouncementUseCase.remove(id);
      return respond(res, 200, true, MessageHandler.SUC003, data);
    } catch (error) {
      logger.error('[Announcement] ERROR', error);
      if (error.message) {
        return respond(res, 400, false, error.message);
      }
      return respond(res, 500, false, MessageHandler.ERR000);
    }
  }
}
