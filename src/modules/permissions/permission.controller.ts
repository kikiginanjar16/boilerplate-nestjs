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
import { PermissionDto } from './dto/form.dto';
import { ADMIN, JWT_ACCESS_TOKEN } from 'src/common/constant/constant';
import { Roles } from 'src/guards/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { ApiBearerAuth, ApiProperty } from '@nestjs/swagger';
import { CreatePermissionUseCase } from './usecases/create-permission.usecase';
import { GetPermissionUseCase } from './usecases/get-permission.usecase';
import { UpdatePermissionUseCase } from './usecases/update-permission.usecase';
import { DeletePermissionUseCase } from './usecases/delete-permission.usecase';

@ApiBearerAuth(JWT_ACCESS_TOKEN)
@Controller({ version: '1', path: 'permissions' })
export class PermissionController {
  constructor(
    private readonly createPermissionUseCase: CreatePermissionUseCase,
    private readonly getPermissionUseCase: GetPermissionUseCase,
    private readonly updatePermissionUseCase: UpdatePermissionUseCase,
    private readonly deletePermissionUseCase: DeletePermissionUseCase,
  ) { }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(ADMIN)
  async create(@Res() res, @Body() body: PermissionDto): Promise<any> {
    try {
      const logged = res.locals.logged;
      const data : any = await this.createPermissionUseCase.execute(body, logged);
      return respond(res, 201, true, MessageHandler.SUC001, data?.data, data?.meta);
    } catch (error) {
      logger.error('[Permission] ERROR', error);
      if (error.message) {
        return respond(res, 400, false, error.message);
      }
      return respond(res, 500, false, MessageHandler.ERR000);
    }
  }

  @Put(":id")
  @UseGuards(RolesGuard)
  @Roles(ADMIN)
  async update(@Res() res, @Param('id') id: string, @Body() body: PermissionDto): Promise<any> {
    try {
      const logged = res.locals.logged;
      const data = await this.updatePermissionUseCase.execute(id, body, logged);
      return respond(res, 200, true, MessageHandler.SUC002, data);
    } catch (error) {
      logger.error('[Permission] ERROR', error);
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
      const data: any = await this.getPermissionUseCase.paginate(page, limit, logged);
      return respond(res, 200, true, MessageHandler.SUC000, data);
    } catch (error) {
      logger.error('[Permission] ERROR', error);
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
      const data = await this.getPermissionUseCase.findOne(id, logged);
      return respond(res, 200, true, MessageHandler.SUC000, data);
    } catch (error) {
      logger.error('[Permission] ERROR', error);
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
      const data = await this.deletePermissionUseCase.execute(id, logged);
      return respond(res, 200, true, MessageHandler.SUC003, data);
    } catch (error) {
      logger.error('[Permission] ERROR', error);
      if (error.message) {
        return respond(res, 400, false, error.message);
      }
      return respond(res, 500, false, MessageHandler.ERR000);
    }
  }
}
