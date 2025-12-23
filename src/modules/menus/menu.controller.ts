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
import MessageHandler from 'src/common/message';
import { PaginateDto } from 'src/libraries/common/search.dto';
import logger from 'src/libraries/logger';
import { respond } from 'src/libraries/respond';
import { MenuDto } from './dto/form.dto';
import { ADMIN, JWT_ACCESS_TOKEN } from 'src/common/constant/constant';
import { Roles } from 'src/guards/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateMenuUseCase } from './usecases/create-menu.usecase';
import { GetMenuUseCase } from './usecases/get-menu.usecase';
import { UpdateMenuUseCase } from './usecases/update-menu.usecase';
import { DeleteMenuUseCase } from './usecases/delete-menu.usecase';

@ApiBearerAuth(JWT_ACCESS_TOKEN)
@Controller({ version: '1', path: 'menus' })
export class MenuController {
  constructor(
    private readonly createMenuUseCase: CreateMenuUseCase,
    private readonly getMenuUseCase: GetMenuUseCase,
    private readonly updateMenuUseCase: UpdateMenuUseCase,
    private readonly deleteMenuUseCase: DeleteMenuUseCase,
  ) { }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(ADMIN)
  async create(@Res() res, @Body() body: MenuDto): Promise<any> {
    try {
      const logged = res.locals.logged;
      const data : any = await this.createMenuUseCase.execute(body, logged);
      return respond(res, 201, true, MessageHandler.SUC001, data?.data, data?.meta);
    } catch (error) {
      logger.error('[Menu] ERROR', error);
      if (error.message) {
        return respond(res, 400, false, error.message);
      }
      return respond(res, 500, false, MessageHandler.ERR000);
    }
  }

  @Put(":id")
  @UseGuards(RolesGuard)
  @Roles(ADMIN)
  async update(@Res() res, @Param('id') id: string, @Body() body: MenuDto): Promise<any> {
    try {
      const logged = res.locals.logged;
      const data = await this.updateMenuUseCase.execute(id, body, logged);
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
  @UseGuards(RolesGuard)
  @Roles(ADMIN)
  async findAll(@Res() res, @Query() query: PaginateDto): Promise<any[]> {
    try {
      const { page, limit } = query;
      const logged = res.locals.logged;
      const data: any = await this.getMenuUseCase.paginate(page, limit, logged);
      return respond(res, 200, true, MessageHandler.SUC000, data);
    } catch (error) {
      logger.error('[Menu] ERROR', error);
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
      const data = await this.getMenuUseCase.findOne(id, logged);
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
  @UseGuards(RolesGuard)
  @Roles(ADMIN)
  async remove(@Res() res, @Param('id') id: string): Promise<void> {
    try {
      const logged = res.locals.logged;
      const data = await this.deleteMenuUseCase.execute(id, logged);
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
