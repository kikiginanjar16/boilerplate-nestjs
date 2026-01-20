import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthAudit } from 'src/entities/auth-audit.entity';
import { RevokedToken } from 'src/entities/revoked-token.entity';
import { User } from 'src/entities/user.entity';

import { ForgotController } from './forgot.controller';
import { LoginController } from './login.controller';
import { LogoutController } from './logout.controller';
import { OauthController } from './oauth.controller';
import { RegisterController } from './register.controller';
import { AuthAuditUseCase } from './usecases/auth-audit.usecase';
import { ForgotUseCase } from './usecases/forgot.usecase';
import { GoogleOauthUseCase } from './usecases/google-oauth.usecase';
import { LoginUseCase } from './usecases/login.usecase';
import { LogoutUseCase } from './usecases/logout.usecase';
import { RegisterUseCase } from './usecases/register.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([User, RevokedToken, AuthAudit])],
  providers: [
    LoginUseCase,
    ForgotUseCase,
    RegisterUseCase,
    LogoutUseCase,
    GoogleOauthUseCase,
    AuthAuditUseCase,
  ],
  controllers: [
    LoginController,
    RegisterController,
    ForgotController,
    LogoutController,
    OauthController,
  ],
})
export class PublicModule {}
