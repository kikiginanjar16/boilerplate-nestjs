import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsInt, IsOptional } from 'class-validator';

export class PermissionDto {
    @IsOptional()
    @IsUUID()
    @ApiProperty({
        description: 'The ID of the menu associated with the permission',
        example: '123e4567-e89b-12d3-a456-426614174000',
        nullable: true,
    })
    public menu_id?: string;

    @IsOptional()
    @IsUUID()
    @ApiProperty({
        description: 'The ID of the role associated with the permission',
        example: '987fcdeb-1234-5678-9012-34567890abcd',
        nullable: true,
    })
    public role_id?: string;

    @IsInt()
    @IsOptional()
    @ApiProperty({
        description: 'Permission to create (0 for denied, 1 for allowed)',
        example: 1,
        nullable: true,
    })
    public create?: number;

    @IsInt()
    @IsOptional()
    @ApiProperty({
        description: 'Permission to read (0 for denied, 1 for allowed)',
        example: 1,
        nullable: true,
    })
    public read?: number;

    @IsInt()
    @IsOptional()
    @ApiProperty({
        description: 'Permission to update (0 for denied, 1 for allowed)',
        example: 1,
        nullable: true,
    })
    public update?: number;

    @IsInt()
    @IsOptional()
    @ApiProperty({
        description: 'Permission to delete (0 for denied, 1 for allowed)',
        example: 0,
        nullable: true,
    })
    public delete?: number;

    @IsInt()
    @IsOptional()
    @ApiProperty({
        description: 'Permission to approve (0 for denied, 1 for allowed)',
        example: 0,
        nullable: true,
    })
    public approve?: number;
}