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
import { CategoryUseCase } from './usecases/category.usecase';
import MessageHandler from 'src/common/message';
import { PaginateDto } from 'src/libraries/common/search.dto';
import logger from 'src/libraries/logger';
import { respond } from 'src/libraries/respond';
import { CategoryDto } from './dto/form.dto';

@Controller({ version: '1', path: 'categories' })
export class CategoryController {
  constructor(private readonly categoryUseCase: CategoryUseCase) { }

  @Post()
  async create(@Res() res, @Body() body: CategoryDto): Promise<any> {
    try {
      const data = await this.categoryUseCase.create(body);
      return respond(res, 201, true, MessageHandler.SUC001, data);
    } catch (error) {
      logger.error('[Category] ERROR', error);
      if (error.message) {
        return respond(res, 400, false, error.message);
      }
      return respond(res, 500, false, MessageHandler.ERR000);
    }
  }

  @Put(":id")
  async update(@Res() res, @Param('id') id: string, @Body() body: CategoryDto): Promise<any> {
    try {
      const data = await this.categoryUseCase.update(id, body);
      return respond(res, 200, true, MessageHandler.SUC002, data);
    } catch (error) {
      logger.error('[Category] ERROR', error);
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
      const data: any = await this.categoryUseCase.paginate(page, limit);
      return respond(res, 200, true, MessageHandler.SUC000, data.data, data.meta);
    } catch (error) {
      logger.error('[Category] ERROR', error);
      if (error.message) {
        return respond(res, 400, false, error.message);
      }
      return respond(res, 500, false, MessageHandler.ERR000);
    }
  }

  @Get("/skill")
  async skill(@Res() res): Promise<any[]> {
    try {
      const data: any = await this.categoryUseCase.skill();
      return respond(res, 200, true, MessageHandler.SUC000, data.data);
    } catch (error) {
      logger.error('[Category] ERROR', error);
      if (error.message) {
        return respond(res, 400, false, error.message);
      }
      return respond(res, 500, false, MessageHandler.ERR000);
    }
  }

  @Get(':id')
  async findOne(@Res() res, @Param('id') id: string): Promise<any> {
    try {
      const data = await this.categoryUseCase.findOne(id);
      return respond(res, 200, true, MessageHandler.SUC000, data);
    } catch (error) {
      logger.error('[Category] ERROR', error);
      if (error.message) {
        return respond(res, 400, false, error.message);
      }
      return respond(res, 500, false, MessageHandler.ERR000);
    }
  }

  @Delete(':id')
  async remove(@Res() res, @Param('id') id: string): Promise<void> {
    try {
      const data = await this.categoryUseCase.remove(id);
      return respond(res, 200, true, MessageHandler.SUC003, data);
    } catch (error) {
      logger.error('[Category] ERROR', error);
      if (error.message) {
        return respond(res, 400, false, error.message);
      }
      return respond(res, 500, false, MessageHandler.ERR000);
    }
  }
}
