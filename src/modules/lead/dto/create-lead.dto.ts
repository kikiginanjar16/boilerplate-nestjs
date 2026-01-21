import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, IsNotEmpty, IsUUID, IsEnum, IsArray } from 'class-validator';

export enum LeadStatus {
  NEW = 'new',
  CONTACTED = 'contacted',
  QUALIFIED = 'qualified',
  LOST = 'lost',
  CONVERTED = 'converted',
}

export class CreateLeadDto {
  @ApiProperty({
    description: 'Full name of the lead',
    example: 'John Doe'
  })
  @IsOptional()
  public name: string | undefined;

  @ApiProperty({
    description: 'Email address of the lead',
    example: 'john.doe@email.com'
  })
  @IsOptional()
  public email: string | undefined;

  @ApiProperty({
    description: 'Phone number of the lead',
    example: '+628123456789'
  })
  @IsOptional()
  public phone: string | undefined;

  @ApiProperty({
    description: 'Company or organization name',
    example: 'PT Teknologi Nusantara'
  })
  @IsOptional()
  public company: string | undefined;

  @ApiProperty({
    description: 'Source of the lead',
    example: 'website'
  })
  @IsOptional()
  public source: string | undefined;

  @ApiProperty({
    description: 'Current status of the lead',
    enum: LeadStatus,
    example: 'new'
  })
  @IsEnum(LeadStatus)
  @IsOptional()
  public status: LeadStatus | undefined;

  @ApiProperty({
    description: 'Additional notes about the lead',
    example: 'Interested in AI automation demo'
  })
  @IsOptional()
  public notes: string | undefined;

  @ApiProperty({
    description: 'ID of the category this lead belongs to',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid'
  })
  @IsUUID('4')
  @IsOptional()
  public category_id: string | undefined;

}