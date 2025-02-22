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
import { MenuUseCase } from './usecases/menu.usecase';
import MessageHandler from 'src/common/message';
import { PaginateDto } from 'src/libraries/common/search.dto';
import logger from 'src/libraries/logger';
import { respond } from 'src/libraries/respond';
import { MenuDto } from './dto/form.dto';

@Controller({ version: '1', path: 'menus' })
export class MenuController {
  constructor(private readonly menuUseCase: MenuUseCase) { }

  @Post()
  async create(@Res() res, @Body() body: MenuDto): Promise<any> {
    try {
      const data = await this.menuUseCase.create(body);
      return respond(res, 201, true, MessageHandler.SUC001, data);
    } catch (error) {
      logger.error('[Menu] ERROR', error);
      if (error.message) {
        return respond(res, 400, false, error.message);
      }
      return respond(res, 500, false, MessageHandler.ERR000);
    }
  }

  @Put(":id")
  async update(@Res() res, @Param('id') id: string, @Body() body: MenuDto): Promise<any> {
    try {
      const data = await this.menuUseCase.update(id, body);
      return respond(res, 200, true, MessageHandler.SUC002, data);
    } catch (error) {
      logger.error('[Menu] ERROR', error);
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
      const data: any = await this.menuUseCase.paginate(page, limit);
      return respond(res, 200, true, MessageHandler.SUC000, data.data, data.meta);
    } catch (error) {
      logger.error('[Menu] ERROR', error);
      if (error.message) {
        return respond(res, 400, false, error.message);
      }
      return respond(res, 500, false, MessageHandler.ERR000);
    }
  }

  @Get(':id')
  async findOne(@Res() res, @Param('id') id: string): Promise<any> {
    try {
      const data = await this.menuUseCase.findOne(id);
      return respond(res, 200, true, MessageHandler.SUC000, data);
    } catch (error) {
      logger.error('[Menu] ERROR', error);
      if (error.message) {
        return respond(res, 400, false, error.message);
      }
      return respond(res, 500, false, MessageHandler.ERR000);
    }
  }

  @Delete(':id')
  async remove(@Res() res, @Param('id') id: string): Promise<void> {
    try {
      const data = await this.menuUseCase.remove(id);
      return respond(res, 200, true, MessageHandler.SUC003, data);
    } catch (error) {
      logger.error('[Menu] ERROR', error);
      if (error.message) {
        return respond(res, 400, false, error.message);
      }
      return respond(res, 500, false, MessageHandler.ERR000);
    }
  }
}
