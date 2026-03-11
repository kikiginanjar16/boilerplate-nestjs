import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
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
  @HttpCode(HttpStatus.OK)
  async update(@Res() res, @Body() body: ProfileUserDto): Promise<any> {
    try {
      const logged = res.locals.logged;
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
  @HttpCode(HttpStatus.OK)
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
  @HttpCode(HttpStatus.OK)
  async uploadAvatar(@Req() req, @Res() res): Promise<void> {
    try {
      const upload = await req.file();
      if (!upload) {
        return respond(res, 400, false, 'File is required');
      }

      if (!['image/png', 'image/jpeg', 'image/jpg'].includes(upload.mimetype)) {
        return respond(res, 400, false, 'Validation failed (expected type is .(png|jpeg|jpg))');
      }

      const buffer = await upload.toBuffer();
      if (buffer.length > 2 * 1000 * 1024) {
        return respond(res, 400, false, 'Validation failed (expected size is less than 2000000)');
      }

      const id = res.locals.logged.id;
      const data = await this.profileUseCase.uploadAvatar(id, {
        originalname: upload.filename,
        mimetype: upload.mimetype,
        buffer,
      });
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
