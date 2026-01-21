import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, IsNotEmpty, IsUUID, IsEnum, IsArray } from 'class-validator';


export class CreateItemDto {
  @ApiProperty({
    description: 'Title of the item',
    example: 'AI Workflow Automation'
  })
  @IsOptional()
  public title: string | undefined;

  @ApiProperty({
    description: 'Detailed description of the item',
    example: 'This item demonstrates an AI-based workflow automation proof of concept'
  })
  @IsOptional()
  public description: string | undefined;

  @ApiProperty({
    description: 'YouTube video URL related to the item',
    example: 'https://www.youtube.com/watch?v&#x3D;xxxxxxx'
  })
  @IsOptional()
  public youtube_url: string | undefined;

  @ApiProperty({
    description: 'Proof of Concept URL',
    example: 'https://poc.example.com/item-ai-workflow'
  })
  @IsOptional()
  public poc_url: string | undefined;

  @ApiProperty({
    description: 'Presentation slide URL',
    example: 'https://slides.example.com/ai-workflow'
  })
  @IsOptional()
  public slide_url: string | undefined;

}