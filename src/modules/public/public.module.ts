import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginController } from './login.controller';
import { LoginUseCase } from './usecases/login.usecase';
import { User } from 'src/entities/user.entity';
import { RegisterController } from './register.controller';
import { ForgotController } from './forgot.controller';
import { ForgotUseCase } from './usecases/forgot.usecase';
import { RegisterUseCase } from './usecases/register.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [LoginUseCase, ForgotUseCase, RegisterUseCase],
  controllers: [LoginController, RegisterController, ForgotController],
})
export class PublicModule {}
