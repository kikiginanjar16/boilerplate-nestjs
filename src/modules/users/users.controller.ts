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
import { User } from '../../entities/user.entity';
import { UserUseCase } from './usecases/users.usecase';
import MessageHandler from 'src/common/message';
import { PaginateDto } from 'src/libraries/common/search.dto';
import logger from 'src/libraries/logger';
import { respond } from 'src/libraries/respond';
import { UserDto } from './dto/form.dto';

@Controller({ version: '1', path: 'users' })
export class UsersController {
  constructor(private readonly userUseCase: UserUseCase) { }

  @Post()
  async create(@Res() res, @Body() createUserDto: UserDto): Promise<User> {
    try {
      const data = await this.userUseCase.create(createUserDto);
      return respond(res, 201, true, MessageHandler.SUC001, data);
    } catch (error) {
      logger.error('[USER] ERROR', error);
      if (error.message) {
        return respond(res, 400, false, error.message);
      }
      return respond(res, 500, false, MessageHandler.ERR000);
    }
  }

  @Put(":id")
  async update(@Res() res, @Param('id') id: string, @Body() body: UserDto): Promise<any> {
    try {
      const data = await this.userUseCase.update(id, body);
      return respond(res, 200, true, MessageHandler.SUC002, data);
    } catch (error) {
      logger.error('[USER] ERROR', error);
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
      const data: any = await this.userUseCase.paginate(page, limit);
      return respond(res, 200, true, MessageHandler.SUC000, data.data, data.meta);
    } catch (error) {
      logger.error('[USER] ERROR', error);
      if (error.message) {
        return respond(res, 400, false, error.message);
      }
      return respond(res, 500, false, MessageHandler.ERR000);
    }
  }

  @Get(':id')
  async findOne(@Res() res, @Param('id') id: string): Promise<User> {
    try {
      const data = await this.userUseCase.findOne(id);
      return respond(res, 200, true, MessageHandler.SUC000, data);
    } catch (error) {
      logger.error('[USER] ERROR', error);
      if (error.message) {
        return respond(res, 400, false, error.message);
      }
      return respond(res, 500, false, MessageHandler.ERR000);
    }
  }

  @Delete(':id')
  async remove(@Res() res, @Param('id') id: string): Promise<void> {
    try {
      const data = await this.userUseCase.remove(id);
      return respond(res, 200, true, MessageHandler.SUC003, data);
    } catch (error) {
      logger.error('[USER] ERROR', error);
      if (error.message) {
        return respond(res, 400, false, error.message);
      }
      return respond(res, 500, false, MessageHandler.ERR000);
    }
  }

}
