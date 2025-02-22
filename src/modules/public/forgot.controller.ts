import {
    Body,
    Controller,
    Post,
    Res,
} from '@nestjs/common';
import logger from 'src/libraries/logger';
import { respond } from 'src/libraries/respond';
import MessageHandler from 'src/common/message';
import { ForgotUseCase } from './usecases/forgot.usecase';
import { ForgotDto } from './dto/forgot.dto';

@Controller({ version: '1', path: 'forgot-password' })
export class ForgotController {
    constructor(
        private readonly forgotUseCase: ForgotUseCase
    ) { }

    @Post()
    async forgot(@Res() res, @Body() body: ForgotDto): Promise<any> {
        try {
            const data = await this.forgotUseCase.doForgotPassword(body.phone);
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