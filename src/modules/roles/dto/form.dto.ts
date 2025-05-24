import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class RoleDto {
    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'The title of the role',
        example: 'Administrator',
        nullable: true,
    })
    public title?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'The description of the role',
        example: 'This role is responsible for managing user permissions.',
        nullable: true,
    })
    public description?: string;
}