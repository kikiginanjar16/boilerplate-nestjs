import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { AppRequest } from 'src/libraries/common/http.interface';

import { AuthenticatedUser } from '../types/auth-context.type';

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): AuthenticatedUser | undefined => {
    const request = context.switchToHttp().getRequest<AppRequest>();
    return request.logged;
  },
);
