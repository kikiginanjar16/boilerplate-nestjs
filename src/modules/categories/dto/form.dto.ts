import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsOptional } from 'class-validator';

export class CategoryDto {
    @IsString()
    @ApiProperty()
    @IsOptional()
    type: string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    sub_category: string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    label: string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    value: string;

    @IsEnum(['active', 'inactive'])
    @ApiProperty()
    @IsOptional()
    status: string;
    
}