import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeadController } from './controllers/lead.controller';
import { CreateLeadUseCase } from './usecases/create-lead.usecase';
import { GetLeadUseCase } from './usecases/get-lead.usecase';
import { UpdateLeadUseCase } from './usecases/update-lead.usecase';
import { DeleteLeadUseCase } from './usecases/delete-lead.usecase';
import { Lead } from '../../entities/lead.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lead])],
  controllers: [LeadController],
  providers: [
    CreateLeadUseCase,
    GetLeadUseCase,
    UpdateLeadUseCase,
    DeleteLeadUseCase,
  ],
})
export class LeadModule {}