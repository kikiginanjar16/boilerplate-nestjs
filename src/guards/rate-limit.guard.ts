import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import Constant from 'src/common/constant';
import MessageHandler from 'src/common/message';
import { AppRequest, AppResponse, getIpAddress, getPathname } from 'src/libraries/common/http.interface';

type RateEntry = {
  count: number;
  resetAt: number;
};

const RATE_LIMIT_STORE = new Map<string, RateEntry>();

@Injectable()
export class RateLimitGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<AppRequest>();
    const response = context.switchToHttp().getResponse<AppResponse>();
    const windowMs = Constant.RATE_LIMIT_WINDOW_MS;
    const maxAttempts = Constant.RATE_LIMIT_MAX_ATTEMPTS;
    const key = `${getIpAddress(request)}:${getPathname(request)}`;
    const now = Date.now();
    const entry = RATE_LIMIT_STORE.get(key);

    if (!entry || entry.resetAt <= now) {
      RATE_LIMIT_STORE.set(key, { count: 1, resetAt: now + windowMs });
      return true;
    }

    if (entry.count >= maxAttempts) {
      const res = response.status(429);
      if (typeof res.send === 'function') {
        res.send({ message: MessageHandler.ERR012 });
      } else {
        res.json?.({ message: MessageHandler.ERR012 });
      }
      return false;
    }

    entry.count += 1;
    RATE_LIMIT_STORE.set(key, entry);
    return true;
  }
}
