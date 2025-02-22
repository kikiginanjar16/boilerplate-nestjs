import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class BlogDto {
    @IsString()
    @IsOptional()
    @ApiProperty()
    title: string;

    @IsOptional()
    @ApiProperty()
    image?: any;

    @IsString()
    @IsOptional()
    @ApiProperty()
    content: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    author: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    category_id: string;

    @IsNumber()
    @IsOptional()
    @ApiProperty()
    status: number;
}