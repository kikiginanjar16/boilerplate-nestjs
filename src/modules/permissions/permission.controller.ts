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

import { ADMIN, JWT_ACCESS_TOKEN } from 'src/common/constant/constant';
import MessageHandler from 'src/common/message';
import { Roles } from 'src/guards/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { PaginateDto } from 'src/libraries/common/search.dto';
import logger from 'src/libraries/logger';
import { respond } from 'src/libraries/respond';

import { PermissionDto } from './dto/form.dto';
import { CreatePermissionUseCase } from './usecases/create-permission.usecase';
import { DeletePermissionUseCase } from './usecases/delete-permission.usecase';
import { GetPermissionUseCase } from './usecases/get-permission.usecase';
import { GetUamUarUseCase } from './usecases/get-uam-uar.usecase';
import { UpdatePermissionUseCase } from './usecases/update-permission.usecase';

@ApiBearerAuth(JWT_ACCESS_TOKEN)
@Controller({ version: '1', path: 'permissions' })
export class PermissionController {
  constructor(
    private readonly createPermissionUseCase: CreatePermissionUseCase,
    private readonly getPermissionUseCase: GetPermissionUseCase,
    private readonly getUamUarUseCase: GetUamUarUseCase,
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

  @Get('uam-uar')
  @ApiProperty({ type: () => PaginateDto })
  @UseGuards(RolesGuard)
  @Roles(ADMIN)
  async findUamUar(@Res() res, @Query() query: PaginateDto): Promise<any[]> {
    try {
      const { page, limit } = query;
      const data: any = await this.getUamUarUseCase.paginate(page, limit);
      return respond(res, 200, true, MessageHandler.SUC000, data);
    } catch (error) {
      logger.error('[Permission] ERROR', error);
      if (error.message) {
        return respond(res, 400, false, error.message);
      }
      return respond(res, 500, false, MessageHandler.ERR000);
    }
  }

  @Get('uam-uar/export')
  @UseGuards(RolesGuard)
  @Roles(ADMIN)
  async exportUamUar(@Res() res): Promise<any> {
    try {
      const data = await this.getUamUarUseCase.listAll();
      const headers = [
        'User ID',
        'User Name',
        'User Email',
        'User Role',
        'Role ID',
        'Role Title',
        'Menu ID',
        'Menu Title',
        'Menu URL',
        'Can Create',
        'Can Read',
        'Can Update',
        'Can Delete',
        'Can Approve',
      ];

      const headerToKeyMap: Record<string, string> = {
        'User ID': 'userId',
        'User Name': 'userName',
        'User Email': 'userEmail',
        'User Role': 'userRole',
        'Role ID': 'roleId',
        'Role Title': 'roleTitle',
        'Menu ID': 'menuId',
        'Menu Title': 'menuTitle',
        'Menu URL': 'menuUrl',
        'Can Create': 'canCreate',
        'Can Read': 'canRead',
        'Can Update': 'canUpdate',
        'Can Delete': 'canDelete',
        'Can Approve': 'canApprove',
      };

      const escapeCsv = (value: any): string => {
        if (value === null || value === undefined) return '';
        const stringValue = String(value);
        if (/[",\n]/.test(stringValue)) {
          return `"${stringValue.replace(/"/g, '""')}"`;
        }
        return stringValue;
      };

      const csvLines = [
        headers.join(','),
        ...data.map((row) =>
          headers
            .map((header) => escapeCsv(row[headerToKeyMap[header]]))
            .join(',')
        ),
      ];
      const csvContent = `${csvLines.join('\n')}\n`;

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="uam-uar.csv"');
      return res.status(200).send(csvContent);
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
