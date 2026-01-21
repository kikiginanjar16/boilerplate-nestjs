import { Controller, Get, Post, Put, Delete, Body, Param, Query, Res, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiQuery, ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateLeadUseCase } from '../usecases/create-lead.usecase';
import { GetLeadUseCase } from '../usecases/get-lead.usecase';
import { UpdateLeadUseCase } from '../usecases/update-lead.usecase';
import { DeleteLeadUseCase } from '../usecases/delete-lead.usecase';

import { CreateLeadDto } from '../dto/create-lead.dto';
import { UpdateLeadDto } from '../dto/update-lead.dto';
import { LeadStatus } from 'src/entities/lead.entity';

@ApiTags('leads')
@Controller({ version: '1', path: 'leads' })
export class LeadController {
  constructor(
    private readonly createLeadUseCase: CreateLeadUseCase,
    private readonly getLeadUseCase: GetLeadUseCase,
    private readonly updateLeadUseCase: UpdateLeadUseCase,
    private readonly deleteLeadUseCase: DeleteLeadUseCase,
    
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Lead' })
  @ApiBody({ type: CreateLeadDto })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async create(@Body() createLeadDto: CreateLeadDto, @Res() res: Response) {
    try {
      const data : any = await this.createLeadUseCase.execute(createLeadDto, res.locals.logged);
      return res.status(201).json({
        status: true,
        message: 'Lead created successfully',
        data: data
      });
    } catch (error) {
      return res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all Leads' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number for pagination', example: 1 }) 
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page', example: 10 })
  async findAll(
    @Res() res: Response, 
    @Query('page') page: number, 
    @Query('limit') limit: number,
    @Query('name') name: string | undefined,
    @Query('email') email: string | undefined,
    @Query('phone') phone: string | undefined,
    @Query('company') company: string | undefined,
    @Query('source') source: string | undefined,
    @Query('status') status: LeadStatus | undefined,
    @Query('notes') notes: string | undefined,
    @Query('category_id') category_id: string | undefined,
  ) {
    try {
      const whereConditions : any = {};
      if(name){
          whereConditions['name'] = name;
      }
      if(email){
          whereConditions['email'] = email;
      }
      if(phone){
          whereConditions['phone'] = phone;
      }
      if(company){
          whereConditions['company'] = company;
      }
      if(source){
          whereConditions['source'] = source;
      }
      if(status){
          whereConditions['status'] = status;
      }
      if(notes){
          whereConditions['notes'] = notes;
      }
      if(category_id){
          whereConditions['category_id'] = category_id;
      }

      const data : any = await this.getLeadUseCase.paginate(page, limit, whereConditions, [], res.locals.logged);
      return res.status(200).json({
        status: true,
        message: 'Leads retrieved successfully',
        data: data?.data,
        meta: data?.meta
      });
    } catch (error) {
      return res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a Lead by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the Lead', format: 'uuid', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const data = await this.getLeadUseCase.execute(id);
      if (!data) {
        return res.status(404).json({
          status: false,
          message: 'Lead not found',
        });
      }
      return res.status(200).json({
        status: true,
        message: 'Lead retrieved successfully',
        data,
      });
    } catch (error) {
      return res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a Lead by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the Lead', format: 'uuid', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiBody({ type: UpdateLeadDto })
  @ApiResponse({ status: 404, description: 'Not Found' })
  async update(@Param('id') id: string, @Body() updateLeadDto: UpdateLeadDto, @Res() res: Response) {
    try {
      const data = await this.updateLeadUseCase.execute(id, updateLeadDto, res.locals.logged);
      if (!data) {
        return res.status(404).json({
          status: false,
          message: 'Lead not found',
        });
      }
      return res.status(200).json({
        status: true,
        message: 'Lead updated successfully',
        data,
      });
    } catch (error) {
      return res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a Lead by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the Lead', format: 'uuid', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const data = await this.deleteLeadUseCase.execute(id, res.locals.logged);
      if (!data) {
        return res.status(404).json({
          status: false,
          message: 'Lead not found',
        });
      }
      return res.status(200).json({
        status: true,
        message: 'Lead deleted successfully',
        data,
      });
    } catch (error) {
      return res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  }

  
}