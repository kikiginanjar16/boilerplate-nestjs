import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsInt, IsOptional } from 'class-validator';

export class PermissionDto {
    @IsOptional()
    @IsUUID()
    @ApiProperty()
    menu_id?: string;

    @IsOptional()
    @IsUUID()
    @ApiProperty()
    role_id?: string;

    @IsInt()
    @IsOptional()
    @ApiProperty()
    create: number;

    @IsInt()
    @IsOptional()
    @ApiProperty()
    read: number;

    @IsInt()
    @IsOptional()
    @ApiProperty()
    update: number;

    @IsInt()
    @IsOptional()
    @ApiProperty()
    delete: number;

    @IsInt()
    @IsOptional()
    @ApiProperty()
    approve: number;
}