import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsOptional } from 'class-validator';

export class MenuDto {
    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'The title of the menu item',
        example: 'Dashboard',
        nullable: true,
    })
    public title?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'The icon associated with the menu item',
        example: 'fa-home',
        nullable: true,
    })
    public icon?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'The URL linked to the menu item',
        example: '/dashboard',
        nullable: true,
    })
    public url?: string;

    @IsEnum(['active', 'inactive'])
    @IsOptional()
    @ApiProperty({
        description: 'The status of the menu item',
        enum: ['active', 'inactive'],
        example: 'active',
        nullable: true,
    })
    public status?: string;
}