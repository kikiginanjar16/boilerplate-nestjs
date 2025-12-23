import {
  Body,
  Controller,
  Post,
  Res,
} from '@nestjs/common';

import MessageHandler from 'src/common/message';
import logger from 'src/libraries/logger';
import { respond } from 'src/libraries/respond';

import { RegisterDto } from './dto/register.dto';
import { RegisterUseCase } from './usecases/register.usecase';

@Controller({ version: '1', path: 'register' })
export class RegisterController {
  constructor(
    private readonly registerUseCase: RegisterUseCase
  ) { }

  @Post()
  async register(@Res() res, @Body() body: RegisterDto): Promise<any> {
    try {
      const data = await this.registerUseCase.doRegister(body);
      return respond(res, 200, true, MessageHandler.SUC007, data);
    } catch (error) {
      logger.error('[REGISTER] ERROR', error);
      if (error.message) {
        return respond(res, 400, false, error.message);
      }

      return respond(res, 500, false, MessageHandler.ERR000);
    }
  }
}