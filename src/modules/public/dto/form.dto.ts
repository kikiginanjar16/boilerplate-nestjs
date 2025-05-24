import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsEmail, IsEnum, IsOptional } from 'class-validator';

export class CreateDto {
    @IsString()
    @ApiProperty({
        description: 'The name of the user',
        example: 'John Doe',
    })
    public name: string;

    @IsOptional()
    @ApiProperty({
        description: 'The URL or path to the user’s avatar image',
        example: 'https://example.com/avatars/john-doe.jpg',
        nullable: true,
    })
    public avatar?: any;

    @IsInt()
    @IsOptional()
    @ApiProperty({
        description: 'The active status of the user (0 for inactive, 1 for active)',
        example: 1,
        nullable: true,
    })
    public is_active?: number;

    @IsString()
    @ApiProperty({
        description: 'The phone number of the user',
        example: '+6281234567890',
    })
    public phone: string;

    @IsEmail()
    @ApiProperty({
        description: 'The email address of the user',
        example: 'john.doe@example.com',
    })
    public email: string;

    @IsString()
    @ApiProperty({
        description: 'The password of the user',
        example: 'securePassword123',
    })
    public password: string;

    @IsEnum(['verified', 'unverified'])
    @IsOptional()
    @ApiProperty({
        description: 'The verification status of the user',
        enum: ['verified', 'unverified'],
        example: 'verified',
        nullable: true,
    })
    public status?: 'verified' | 'unverified';

    @IsEnum(['user', 'admin'])
    @IsOptional()
    @ApiProperty({
        description: 'The type of the user',
        enum: ['user', 'admin'],
        example: 'user',
        nullable: true,
    })
    public type?: 'user' | 'admin';
}