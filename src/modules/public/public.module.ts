import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RevokedToken } from 'src/entities/revoked-token.entity';
import { User } from 'src/entities/user.entity';

import { ForgotController } from './forgot.controller';
import { LoginController } from './login.controller';
import { RegisterController } from './register.controller';
import { LogoutController } from './logout.controller';
import { ForgotUseCase } from './usecases/forgot.usecase';
import { LoginUseCase } from './usecases/login.usecase';
import { LogoutUseCase } from './usecases/logout.usecase';
import { RegisterUseCase } from './usecases/register.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([User, RevokedToken])],
  providers: [LoginUseCase, ForgotUseCase, RegisterUseCase, LogoutUseCase],
  controllers: [
    LoginController,
    RegisterController,
    ForgotController,
    LogoutController,
  ],
})
export class PublicModule {}
