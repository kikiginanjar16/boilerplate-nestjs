import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createHash } from 'crypto';
import * as jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';

import Constant from 'src/common/constant';
import MessageHandler from 'src/common/message';
import { AuthenticatedUser } from 'src/common/types/auth-context.type';
import { RevokedToken } from 'src/entities/revoked-token.entity';
import {
  AppRequest,
  AppResponse,
  getHeader,
  getPathname,
} from 'src/libraries/common/http.interface';

const EXCLUDED_PATHS = new Set([
  '/v1/login',
  '/v1/login/admin',
  '/v1/register',
  '/v1/forgot-password',
  '/v1/otp',
  '/v1/otp/verify',
  '/v1/participants',
  '/v1/oauth/google',
  '/docs',
  '/docs-json',
]);

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    @InjectRepository(RevokedToken)
    private readonly revokedTokenRepository: Repository<RevokedToken>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AppRequest>();
    const response = context.switchToHttp().getResponse<AppResponse>();
    const path = getPathname(request);

    if (EXCLUDED_PATHS.has(path) || path.startsWith('/docs/')) {
      return true;
    }

    const [type, token] = getHeader(request, 'authorization')?.split(' ') ?? [];
    if (!token || type !== 'Bearer') {
      reply(response, 401, MessageHandler.ERR007);
      return false;
    }

    try {
      const verified = jwt.verify(token, Constant.JWT_SECRET) as AuthenticatedUser;
      const tokenHash = createHash('sha256').update(token).digest('hex');
      const revokedToken = await this.revokedTokenRepository.findOne({
        where: { token_hash: tokenHash },
      });

      if (revokedToken) {
        reply(response, 401, MessageHandler.ERR011);
        return false;
      }

      request.logged = verified;
      response.locals = {
        ...(response.locals || {}),
        logged: verified,
      };
      return true;
    } catch {
      reply(response, 401, MessageHandler.ERR008);
      return false;
    }
  }
}

const reply = (response: AppResponse, statusCode: number, message: string): void => {
  const payload = { message };
  const res = response.status(statusCode);
  if (typeof res.send === 'function') {
    res.send(payload);
    return;
  }
  res.json?.(payload);
};
