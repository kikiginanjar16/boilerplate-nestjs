import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiProperty } from '@nestjs/swagger';

import { ADMIN, JWT_ACCESS_TOKEN } from 'src/common/constant/constant';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { LoggedDto } from 'src/common/dtos/logged.dto';
import MessageHandler from 'src/common/message';
import { Roles } from 'src/guards/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { PaginateDto } from 'src/libraries/common/search.dto';
import logger from 'src/libraries/logger';
import { buildResponse, respond } from 'src/libraries/respond';

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
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(RolesGuard)
  @Roles(ADMIN)
  async create(@CurrentUser() logged: LoggedDto, @Body() body: PermissionDto): Promise<any> {
    try {
      const data: any = await this.createPermissionUseCase.execute(body, logged);
      return buildResponse(true, MessageHandler.SUC001, data?.data, data?.meta);
    } catch (error) {
      this.throwJsonError(error);
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles(ADMIN)
  async update(
    @CurrentUser() logged: LoggedDto,
    @Param('id') id: string,
    @Body() body: PermissionDto,
  ): Promise<any> {
    try {
      const data = await this.updatePermissionUseCase.execute(id, body, logged);
      return buildResponse(true, MessageHandler.SUC002, data);
    } catch (error) {
      this.throwJsonError(error);
    }
  }

  @Get()
  @ApiProperty({ type: () => PaginateDto })
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles(ADMIN)
  async findAll(
    @CurrentUser() logged: LoggedDto,
    @Query() query: PaginateDto,
  ): Promise<any> {
    try {
      const { page, limit } = query;
      const data: any = await this.getPermissionUseCase.paginate(page, limit, logged);
      return buildResponse(true, MessageHandler.SUC000, data);
    } catch (error) {
      this.throwJsonError(error);
    }
  }

  @Get('uam-uar')
  @ApiProperty({ type: () => PaginateDto })
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles(ADMIN)
  async findUamUar(@Query() query: PaginateDto): Promise<any> {
    try {
      const { page, limit } = query;
      const data: any = await this.getUamUarUseCase.paginate(page, limit);
      return buildResponse(true, MessageHandler.SUC000, data);
    } catch (error) {
      this.throwJsonError(error);
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

      if (typeof res.header === 'function') {
        res.header('Content-Type', 'text/csv');
        res.header('Content-Disposition', 'attachment; filename="uam-uar.csv"');
      } else {
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="uam-uar.csv"');
      }
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
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles(ADMIN)
  async findOne(
    @CurrentUser() logged: LoggedDto,
    @Param('id') id: string,
  ): Promise<any> {
    try {
      const data = await this.getPermissionUseCase.findOne(id, logged);
      return buildResponse(true, MessageHandler.SUC000, data);
    } catch (error) {
      this.throwJsonError(error);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles(ADMIN)
  async remove(
    @CurrentUser() logged: LoggedDto,
    @Param('id') id: string,
  ): Promise<any> {
    try {
      const data = await this.deletePermissionUseCase.execute(id, logged);
      return buildResponse(true, MessageHandler.SUC003, data);
    } catch (error) {
      this.throwJsonError(error);
    }
  }

  private throwJsonError(error: unknown): never {
    logger.error('[Permission] ERROR', error);
    if (error instanceof Error && error.message) {
      throw new BadRequestException(buildResponse(false, error.message));
    }

    throw new InternalServerErrorException(
      buildResponse(false, MessageHandler.ERR000),
    );
  }
}
