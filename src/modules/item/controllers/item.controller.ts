import { Controller, Get, Post, Put, Delete, Body, Param, Query, Res, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiQuery, ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateItemUseCase } from '../usecases/create-item.usecase';
import { GetItemUseCase } from '../usecases/get-item.usecase';
import { UpdateItemUseCase } from '../usecases/update-item.usecase';
import { DeleteItemUseCase } from '../usecases/delete-item.usecase';

import { CreateItemDto } from '../dto/create-item.dto';
import { UpdateItemDto } from '../dto/update-item.dto';

@ApiTags('items')
@Controller({ version: '1', path: 'items' })
export class ItemController {
  constructor(
    private readonly createItemUseCase: CreateItemUseCase,
    private readonly getItemUseCase: GetItemUseCase,
    private readonly updateItemUseCase: UpdateItemUseCase,
    private readonly deleteItemUseCase: DeleteItemUseCase,
    
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Item' })
  @ApiBody({ type: CreateItemDto })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async create(@Body() createItemDto: CreateItemDto, @Res() res: Response) {
    try {
      const data : any = await this.createItemUseCase.execute(createItemDto, res.locals.logged);
      return res.status(201).json({
        status: true,
        message: 'Item created successfully',
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
  @ApiOperation({ summary: 'Get all Items' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number for pagination', example: 1 }) 
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page', example: 10 })
  async findAll(
    @Res() res: Response, 
    @Query('page') page: number, 
    @Query('limit') limit: number,
    @Query('title') title: string | undefined,
    @Query('description') description: string | undefined,
    @Query('youtube_url') youtube_url: string | undefined,
    @Query('poc_url') poc_url: string | undefined,
    @Query('slide_url') slide_url: string | undefined,
  ) {
    try {
      const whereConditions : any = {};
      if(title){
          whereConditions['title'] = title;
      }
      if(description){
          whereConditions['description'] = description;
      }
      if(youtube_url){
          whereConditions['youtube_url'] = youtube_url;
      }
      if(poc_url){
          whereConditions['poc_url'] = poc_url;
      }
      if(slide_url){
          whereConditions['slide_url'] = slide_url;
      }

      const data : any = await this.getItemUseCase.paginate(page, limit, whereConditions, [], res.locals.logged);
      return res.status(200).json({
        status: true,
        message: 'Items retrieved successfully',
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
  @ApiOperation({ summary: 'Get a Item by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the Item', format: 'uuid', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const data = await this.getItemUseCase.execute(id);
      if (!data) {
        return res.status(404).json({
          status: false,
          message: 'Item not found',
        });
      }
      return res.status(200).json({
        status: true,
        message: 'Item retrieved successfully',
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
  @ApiOperation({ summary: 'Update a Item by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the Item', format: 'uuid', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiBody({ type: UpdateItemDto })
  @ApiResponse({ status: 404, description: 'Not Found' })
  async update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto, @Res() res: Response) {
    try {
      const data = await this.updateItemUseCase.execute(id, updateItemDto, res.locals.logged);
      if (!data) {
        return res.status(404).json({
          status: false,
          message: 'Item not found',
        });
      }
      return res.status(200).json({
        status: true,
        message: 'Item updated successfully',
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
  @ApiOperation({ summary: 'Soft delete a Item by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the Item', format: 'uuid', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const data = await this.deleteItemUseCase.execute(id, res.locals.logged);
      if (!data) {
        return res.status(404).json({
          status: false,
          message: 'Item not found',
        });
      }
      return res.status(200).json({
        status: true,
        message: 'Item deleted successfully',
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