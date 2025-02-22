import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsOptional } from 'class-validator';

export class MenuDto {
    @IsString()
    @IsOptional()
    @ApiProperty()
    title: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    icon: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    url: string;

    @IsEnum(['active', 'inactive'])
    @IsOptional()
    @ApiProperty()
    status: string;
}