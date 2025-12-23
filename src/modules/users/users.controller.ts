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
import { User } from '../../entities/user.entity';
import MessageHandler from 'src/common/message';
import { PaginateDto } from 'src/libraries/common/search.dto';
import logger from 'src/libraries/logger';
import { respond } from 'src/libraries/respond';
import { UserDto } from './dto/form.dto';
import { ApiBearerAuth, ApiProperty } from '@nestjs/swagger';
import { ADMIN, JWT_ACCESS_TOKEN } from 'src/common/constant/constant';
import { Roles } from 'src/guards/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { ILike } from 'typeorm';
import { CreateUserUseCase } from './usecases/create-user.usecase';
import { UpdateUserUseCase } from './usecases/update-user.usecase';
import { GetUserUseCase } from './usecases/get-user.usecase';
import { DeleteUserUseCase } from './usecases/delete-user.usecase';


@ApiBearerAuth(JWT_ACCESS_TOKEN)
@Controller({ version: '1', path: 'users' })
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) { }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(ADMIN)
  async create(@Res() res, @Body() createUserDto: UserDto): Promise<User> {
    try {
      const logged = res.locals.logged;
      const data : any = await this.createUserUseCase.execute(createUserDto, logged);
      return respond(res, 201, true, MessageHandler.SUC001, data?.data, data?.meta);
    } catch (error) {
      logger.error('[USER] ERROR', error);
      if (error.message) {
        return respond(res, 400, false, error.message);
      }
      return respond(res, 500, false, MessageHandler.ERR000);
    }
  }

  @Put(":id")
  @UseGuards(RolesGuard)
  @Roles(ADMIN)
  async update(@Res() res, @Param('id') id: string, @Body() body: UserDto): Promise<any> {
    try {
      const logged = res.locals.logged;
      const data = await this.updateUserUseCase.execute(id, body, logged);
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
  @ApiProperty({ type: () => PaginateDto })
  @UseGuards(RolesGuard)
  @Roles(ADMIN)
  async findAll(@Res() res, @Query() query: PaginateDto): Promise<any[]> {
    try {
      const { page, limit, search } = query;
      const whereCondition = {};
      if (search) {
        Object.assign(whereCondition, {
          name: ILike(`%${search}%`),
        });
      }
      const logged = res.locals.logged;
      const data: any = await this.getUserUseCase.paginate(page, limit, whereCondition, logged);
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
  @UseGuards(RolesGuard)
  @Roles(ADMIN)
  async findOne(@Res() res, @Param('id') id: string): Promise<User> {
    try {
      const logged = res.locals.logged;
      const data = await this.getUserUseCase.findOne(id, logged);
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
  @UseGuards(RolesGuard)
  @Roles(ADMIN)
  async remove(@Res() res, @Param('id') id: string): Promise<void> {
    try {
      const logged = res.locals.logged;
      const data = await this.deleteUserUseCase.execute(id, logged);
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
