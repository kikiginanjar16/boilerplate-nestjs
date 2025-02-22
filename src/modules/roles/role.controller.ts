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
import { RoleUseCase } from './usecases/role.usecase';
import MessageHandler from 'src/common/message';
import { Role } from 'src/entities/role.entity';
import { PaginateDto } from 'src/libraries/common/search.dto';
import logger from 'src/libraries/logger';
import { respond } from 'src/libraries/respond';
import { RoleDto } from './dto/form.dto';

@Controller({ version: '1', path: 'roles' })
export class RoleController {
  constructor(private readonly roleUseCase: RoleUseCase) { }

  @Post()
  async create(@Res() res, @Body() createRoleDto: RoleDto): Promise<Role> {
    try {
      const data = await this.roleUseCase.create(createRoleDto);
      return respond(res, 201, true, MessageHandler.SUC001, data);
    } catch (error) {
      logger.error('[Role] ERROR', error);
      if (error.message) {
        return respond(res, 400, false, error.message);
      }
      return respond(res, 500, false, MessageHandler.ERR000);
    }
  }

  @Put(":id")
  async update(@Res() res, @Param('id') id: string, @Body() body: RoleDto): Promise<any> {
    try {
      const data = await this.roleUseCase.update(id, body);
      return respond(res, 200, true, MessageHandler.SUC002, data);
    } catch (error) {
      logger.error('[Role] ERROR', error);
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
      const data: any = await this.roleUseCase.paginate(page, limit);
      return respond(res, 200, true, MessageHandler.SUC000, data.data, data.meta);
    } catch (error) {
      logger.error('[Role] ERROR', error);
      if (error.message) {
        return respond(res, 400, false, error.message);
      }
      return respond(res, 500, false, MessageHandler.ERR000);
    }
  }

  @Get(':id')
  async findOne(@Res() res, @Param('id') id: string): Promise<Role> {
    try {
      const data = await this.roleUseCase.findOne(id);
      return respond(res, 200, true, MessageHandler.SUC000, data);
    } catch (error) {
      logger.error('[Role] ERROR', error);
      if (error.message) {
        return respond(res, 400, false, error.message);
      }
      return respond(res, 500, false, MessageHandler.ERR000);
    }
  }

  @Delete(':id')
  async remove(@Res() res, @Param('id') id: string): Promise<void> {
    try {
      const data = await this.roleUseCase.remove(id);
      return respond(res, 200, true, MessageHandler.SUC003, data);
    } catch (error) {
      logger.error('[Role] ERROR', error);
      if (error.message) {
        return respond(res, 400, false, error.message);
      }
      return respond(res, 500, false, MessageHandler.ERR000);
    }
  }
}
