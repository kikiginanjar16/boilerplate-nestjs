import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsEmail, IsDecimal, IsEnum, IsOptional } from 'class-validator';

export class UserDto {
    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'The name of the user',
        example: 'John Doe',
        nullable: true,
    })
    public name?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'The URL or path to the user’s avatar image',
        example: 'https://example.com/avatars/john-doe.jpg',
        nullable: true,
    })
    public avatar?: string;

    @IsInt()
    @IsOptional()
    @ApiProperty({
        description: 'The active status of the user (0 for inactive, 1 for active)',
        example: 1,
        nullable: true,
    })
    public is_active?: number;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'The phone number of the user',
        example: '+6281234567890',
        nullable: true,
    })
    public phone?: string;

    @IsEmail()
    @IsOptional()
    @ApiProperty({
        description: 'The email address of the user',
        example: 'john.doe@example.com',
        nullable: true,
    })
    public email?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'The password of the user',
        example: 'securePassword123',
        nullable: true,
    })
    public password?: string;

    @IsDecimal()
    @IsOptional()
    @ApiProperty({
        description: 'The rating of the user',
        example: 4.5,
        nullable: true,
    })
    public rating?: number;

    @IsEnum(['verified', 'unverified'])
    @IsOptional()
    @ApiProperty({
        description: 'The verification status of the user',
        enum: ['verified', 'unverified'],
        example: 'verified',
        nullable: true,
    })
    public status?: string;

    @IsEnum(['user', 'admin'])
    @IsOptional()
    @ApiProperty({
        description: 'The type of the user',
        enum: ['user', 'admin'],
        example: 'user',
        nullable: true,
    })
    public type?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'The address of the user',
        example: '123 Main Street, Jakarta, Indonesia',
        nullable: true,
    })
    public address?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'The latitude coordinate of the user’s location',
        example: '-6.21462',
        nullable: true,
    })
    public lat?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'The longitude coordinate of the user’s location',
        example: '106.84513',
        nullable: true,
    })
    public lng?: string;
}