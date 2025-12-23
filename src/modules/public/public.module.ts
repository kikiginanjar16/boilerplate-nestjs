import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from 'src/entities/user.entity';

import { ForgotController } from './forgot.controller';
import { LoginController } from './login.controller';
import { RegisterController } from './register.controller';
import { ForgotUseCase } from './usecases/forgot.usecase';
import { LoginUseCase } from './usecases/login.usecase';
import { RegisterUseCase } from './usecases/register.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [LoginUseCase, ForgotUseCase, RegisterUseCase],
  controllers: [LoginController, RegisterController, ForgotController],
})
export class PublicModule {}
