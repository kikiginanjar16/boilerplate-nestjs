import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Put,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { ApiBearerAuth } from '@nestjs/swagger';

import { JWT_ACCESS_TOKEN } from 'src/common/constant/constant';
import MessageHandler from 'src/common/message';
import logger from 'src/libraries/logger';
import { respond } from 'src/libraries/respond';

import { ProfileUserDto } from './dto/form.dto';
import { ProfileUseCase } from './usecases/profile.usecase';
import { User } from '../../entities/user.entity';


@ApiBearerAuth(JWT_ACCESS_TOKEN)
@Controller({ version: '1', path: 'profile' })
export class ProfileController {
  constructor(private readonly profileUseCase: ProfileUseCase) { }


  @Put()
  async update(@Res() res, @Body() body: ProfileUserDto): Promise<any> {
    try {
      const logged = res.locals.logged;
      console.log("logged", logged)
      const id = logged.id;
      const data = await this.profileUseCase.update(id, body);
      return respond(res, 200, true, MessageHandler.SUC002, data);
    } catch (error) {
      logger.error('[PROFILE] ERROR', error);
      if (error.message) {
        return respond(res, 400, false, error.message);
      }
      return respond(res, 500, false, MessageHandler.ERR000);
    }
  }

  @Get()
  async findOne(@Res() res): Promise<User> {
    try {
      const logged = res.locals.logged;
      const id = logged.id;
      const data = await this.profileUseCase.findOne(id);
      return respond(res, 200, true, MessageHandler.SUC000, data);
    } catch (error) {
      logger.error('[PROFILE] ERROR', error);
      if (error.message) {
        return respond(res, 400, false, error.message);
      }
      return respond(res, 500, false, MessageHandler.ERR000);
    }
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(@Res() res,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 2 * 1000 * 1024 }),
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
      }),
    ) file: Express.Multer.File): Promise<void> {
    try {
      const id = res.locals.logged.id;
      const data = await this.profileUseCase.uploadAvatar(id, file);
      return respond(res, 200, true, MessageHandler.SUC002, data);
    } catch (error) {
      logger.error('[PROFILE] ERROR', error);
      if (error.message) {
        return respond(res, 400, false, error.message);
      }
      return respond(res, 500, false, MessageHandler.ERR000);
    }
  }
}
