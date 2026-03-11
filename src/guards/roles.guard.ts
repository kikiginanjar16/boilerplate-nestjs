import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';

import Constant from 'src/common/constant';
import { AuthenticatedUser } from 'src/common/types/auth-context.type';
import { AppRequest, getHeader } from 'src/libraries/common/http.interface';


@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        // Get required roles from metadata
        const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!requiredRoles) {
            return true; // No roles specified, allow access
        }

        const request = context.switchToHttp().getRequest<AppRequest>();
        const user = request.logged ?? this.resolveUserFromToken(request);

        try {
            if (!user) {
                throw new UnauthorizedException('No token provided');
            }

            if (!requiredRoles.includes(user.role)) {
                throw new ForbiddenException('Insufficient role permissions');
            }
            
            return true;
        } catch (error) {
            if (error instanceof ForbiddenException) {
                throw error;
            }
            throw new UnauthorizedException('Invalid or expired token');
        }
    }

    private extractTokenFromHeader(request: AppRequest): string | undefined {
        const [type, token] = getHeader(request, 'authorization')?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

    private resolveUserFromToken(request: AppRequest): AuthenticatedUser | undefined {
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            return undefined;
        }

        return jwt.verify(token, Constant.JWT_SECRET) as AuthenticatedUser;
    }
}
