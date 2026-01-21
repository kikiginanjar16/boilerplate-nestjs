import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createHash } from 'crypto';
import { NextFunction, Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';

import Constant from 'src/common/constant';
import MessageHandler from 'src/common/message';
import { RevokedToken } from 'src/entities/revoked-token.entity';
import { IResponse } from 'src/libraries/common/request.interface';

const EXCLUDED_PATHS = [
  '/v1/login',
  '/v1/register',
  '/v1/forgot-password',
  '/v1/otp',
  '/v1/otp/verify',
  '/v1/participants',
  '/v1/oauth/google',
];

@Injectable()
export class JwtValidateMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(RevokedToken)
    private readonly revokedTokenRepository: Repository<RevokedToken>,
  ) { }

  async use(req: Request, res: IResponse, next: NextFunction) {
    try {
      if (EXCLUDED_PATHS.includes(req.baseUrl)) {
        return next();
      }

      const [type, token] = req.header('Authorization')?.split(' ') ?? [];

      if (!token) {
        return res.status(401).json({ message: MessageHandler.ERR007 });
      }

      if (type !== 'Bearer') {
        return res.status(401).json({ message: MessageHandler.ERR007 });
      }

      const verified = jwt.verify(token, Constant.JWT_SECRET);
      const tokenHash = createHash('sha256').update(token).digest('hex');
      const revokedToken = await this.revokedTokenRepository.findOne({
        where: { token_hash: tokenHash },
      });

      if (revokedToken) {
        return res.status(401).json({ message: MessageHandler.ERR011 });
      }

      res.locals.logged = verified;
      return next();
    } catch (err) {
      console.log('err', err);
      return res.status(401).json({ message: MessageHandler.ERR008 });
    }
  }
}
