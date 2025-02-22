import {
  Body,
  Controller,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { LoginUseCase } from './usecases/login.usecase';
import logger from 'src/libraries/logger';
import { respond } from 'src/libraries/respond';
import MessageHandler from 'src/common/message';
import { LoginDto } from './dto/login.dto';


@Controller({ version: '1', path: 'login'})
export class LoginController {
  constructor(
    private readonly loginUseCase: LoginUseCase
  ) {}

  @Post()
  async login(@Res() res, @Req() req, @Body() body: LoginDto): Promise<any> {
      try {
        const data = await this.loginUseCase.doLogin(req, body);
        return respond(res,200, true, MessageHandler.SUC006, data);
      } catch (error) {
        logger.error('[LOGIN] ERROR', error);
        if (error.message) {
            return respond(res,400, false, error.message);
        }
        return respond(res,500, false, MessageHandler.ERR000);
      }
  }

  @Post('/admin')
  async loginAdmin(@Res() res, @Req() req, @Body() body: LoginDto): Promise<any> {
    try {
      const data = await this.loginUseCase.doLoginAdmin(req, body);
      return respond(res, 200, true, MessageHandler.SUC006, data);
    } catch (error) {
      logger.error('[LOGIN] ERROR', error);
      if (error.message) {
        return respond(res, 400, false, error.message);
      }
      return respond(res, 500, false, MessageHandler.ERR000);
    }
  }
}