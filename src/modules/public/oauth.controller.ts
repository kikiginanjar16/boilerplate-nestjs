import { Body, Controller, Post, Req, Res } from '@nestjs/common';

import MessageHandler from 'src/common/message';
import logger from 'src/libraries/logger';
import { respond } from 'src/libraries/respond';

import { GoogleOauthDto } from './dto/google-oauth.dto';
import { AuthAuditUseCase } from './usecases/auth-audit.usecase';
import { GoogleOauthUseCase } from './usecases/google-oauth.usecase';

@Controller({ version: '1', path: 'oauth' })
export class OauthController {
  constructor(
    private readonly googleOauthUseCase: GoogleOauthUseCase,
    private readonly authAuditUseCase: AuthAuditUseCase,
  ) {}

  @Post('google')
  async loginGoogle(@Res() res, @Req() req, @Body() body: GoogleOauthDto) {
    try {
      const data = await this.googleOauthUseCase.doGoogleLogin(
        req,
        body.id_token,
      );
      await this.authAuditUseCase.recordSafe({
        req,
        action: 'oauth_google',
        status: 'success',
        userId: data?.user?.id,
      });
      return respond(res, 200, true, MessageHandler.SUC006, data);
    } catch (error) {
      logger.error('[OAUTH] ERROR', error);
      await this.authAuditUseCase.recordSafe({
        req,
        action: 'oauth_google',
        status: 'failed',
        message: error.message,
      });
      if (error.message) {
        return respond(res, 400, false, error.message);
      }
      return respond(res, 500, false, MessageHandler.ERR000);
    }
  }
}
