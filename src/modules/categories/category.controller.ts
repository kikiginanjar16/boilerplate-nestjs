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
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiProperty } from '@nestjs/swagger';

import { JWT_ACCESS_TOKEN, ADMIN } from 'src/common/constant/constant';
import MessageHandler from 'src/common/message';
import { Roles } from 'src/guards/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { PaginateDto } from 'src/libraries/common/search.dto';
import logger from 'src/libraries/logger';
import { respond } from 'src/libraries/respond';

import { CategoryDto } from './dto/form.dto';
import { CreateCategoryUseCase } from './usecases/create-category.usecase';
import { DeleteCategoryUseCase } from './usecases/delete-category.usecase';
import { GetCategoryUseCase } from './usecases/get-category.usecase';
import { UpdateCategoryUseCase } from './usecases/update-category.usecase';

@ApiBearerAuth(JWT_ACCESS_TOKEN)
@Controller({ version: '1', path: 'categories' })
export class CategoryController {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly getCategoryUseCase: GetCategoryUseCase,
    private readonly updateCategoryUseCase: UpdateCategoryUseCase,
    private readonly deleteCategoryUseCase: DeleteCategoryUseCase,
  ) { }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(ADMIN)
  async create(@Res() res, @Body() body: CategoryDto): Promise<any> {
    try {
      const logged = res.locals.logged;
      const data = await this.createCategoryUseCase.execute(body, logged);
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
  @UseGuards(RolesGuard)
  @Roles(ADMIN)
  async update(@Res() res, @Param('id') id: string, @Body() body: CategoryDto): Promise<any> {
    try {
      const logged = res.locals.logged;
      const data = await this.updateCategoryUseCase.execute(id, body, logged);
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
  @ApiProperty({ type: () => PaginateDto })
  @UseGuards(RolesGuard)
  @Roles(ADMIN)
  async findAll(@Res() res, @Query() query: PaginateDto): Promise<any[]> {
    try {
      const { page, limit } = query;
      const logged = res.locals.logged;
      const data: any = await this.getCategoryUseCase.paginate(page, limit, logged);
      return respond(res, 200, true, MessageHandler.SUC000, data);
    } catch (error) {
      logger.error('[Category] ERROR', error);
      if (error.message) {
        return respond(res, 400, false, error.message);
      }
      return respond(res, 500, false, MessageHandler.ERR000);
    }
  }

  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles(ADMIN)
  async findOne(@Res() res, @Param('id') id: string): Promise<any> {
    try {
      const logged = res.locals.logged;
      const data = await this.getCategoryUseCase.findOne(id, logged);
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
  @UseGuards(RolesGuard)
  @Roles(ADMIN)
  async remove(@Res() res, @Param('id') id: string): Promise<void> {
    try {
      const logged = res.locals.logged;
      const data = await this.deleteCategoryUseCase.execute(id, logged);
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
