import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request } from 'express';

import Constant from 'src/common/constant';
import MessageHandler from 'src/common/message';
import { IResponse } from 'src/libraries/common/request.interface';

type RateEntry = {
  count: number;
  resetAt: number;
};

const RATE_LIMIT_STORE = new Map<string, RateEntry>();

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  use(req: Request, res: IResponse, next: NextFunction) {
    const windowMs = Constant.RATE_LIMIT_WINDOW_MS;
    const maxAttempts = Constant.RATE_LIMIT_MAX_ATTEMPTS;
    const key = `${getIp(req)}:${req.path}`;
    const now = Date.now();
    const entry = RATE_LIMIT_STORE.get(key);

    if (!entry || entry.resetAt <= now) {
      RATE_LIMIT_STORE.set(key, { count: 1, resetAt: now + windowMs });
      return next();
    }

    if (entry.count >= maxAttempts) {
      return res.status(429).json({ message: MessageHandler.ERR012 });
    }

    entry.count += 1;
    RATE_LIMIT_STORE.set(key, entry);
    return next();
  }
}

const getIp = (req: Request): string => {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim();
  }
  return req.ip || 'unknown';
};
