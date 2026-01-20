import {
  Body,
  Controller,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { hashText } from 'pii-cyclops';

import MessageHandler from 'src/common/message';
import logger from 'src/libraries/logger';
import { respond } from 'src/libraries/respond';

import { LoginDto } from './dto/login.dto';
import { AuthAuditUseCase } from './usecases/auth-audit.usecase';
import { LoginUseCase } from './usecases/login.usecase';


@Controller({ version: '1', path: 'login'})
export class LoginController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly authAuditUseCase: AuthAuditUseCase,
  ) {}

  @Post()
  async login(@Res() res, @Req() req, @Body() body: LoginDto): Promise<any> {
      try {
        const data = await this.loginUseCase.doLogin(req, body);
        await this.authAuditUseCase.recordSafe({
          req,
          action: 'login',
          status: 'success',
          userId: data?.user?.id,
        });
        return respond(res,200, true, MessageHandler.SUC006, data);
      } catch (error) {
        logger.error('[LOGIN] ERROR', error);
        await this.authAuditUseCase.recordSafe({
          req,
          action: 'login',
          status: 'failed',
          identifier: body?.username ? hashText(body.username) : null,
          message: error.message,
        });
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
      await this.authAuditUseCase.recordSafe({
        req,
        action: 'login_admin',
        status: 'success',
        userId: data?.user?.id,
      });
      return respond(res, 200, true, MessageHandler.SUC006, data);
    } catch (error) {
      logger.error('[LOGIN] ERROR', error);
      await this.authAuditUseCase.recordSafe({
        req,
        action: 'login_admin',
        status: 'failed',
        identifier: body?.username ? hashText(body.username) : null,
        message: error.message,
      });
      if (error.message) {
        return respond(res, 400, false, error.message);
      }
      return respond(res, 500, false, MessageHandler.ERR000);
    }
  }
}
