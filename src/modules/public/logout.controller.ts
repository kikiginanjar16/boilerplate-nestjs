import { Controller, Post, Req, Res } from '@nestjs/common';

import MessageHandler from 'src/common/message';
import logger from 'src/libraries/logger';
import { respond } from 'src/libraries/respond';

import { LogoutUseCase } from './usecases/logout.usecase';

@Controller({ version: '1', path: 'logout' })
export class LogoutController {
  constructor(private readonly logoutUseCase: LogoutUseCase) {}

  @Post()
  async logout(@Res() res, @Req() req): Promise<any> {
    try {
      const token = req.header('Authorization')?.split(' ')[1];
      if (!token) {
        return respond(res, 401, false, MessageHandler.ERR007);
      }

      await this.logoutUseCase.revokeToken(token, res.locals.logged);
      return respond(res, 200, true, MessageHandler.SUC009);
    } catch (error) {
      logger.error('[LOGOUT] ERROR', error);
      if (error.message) {
        return respond(res, 400, false, error.message);
      }
      return respond(res, 500, false, MessageHandler.ERR000);
    }
  }
}
