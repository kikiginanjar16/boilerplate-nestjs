import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class RoleDto {
    @IsString()
    @IsOptional()
    @ApiProperty()
    title: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    description?: string;
}