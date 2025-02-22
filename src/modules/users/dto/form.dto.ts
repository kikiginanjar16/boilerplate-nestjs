import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, IsPhoneNumber, IsEmail, IsDecimal, IsEnum } from 'class-validator';

export class UserDto {
    @IsString()
    @IsOptional()
    @ApiProperty()
    name: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    avatar?: string;

    @IsInt()
    @IsOptional()
    @ApiProperty()
    is_active: number;

    @IsString()
    @IsOptional()
    @ApiProperty()
    phone: string;

    @IsEmail()
    @IsOptional()
    @ApiProperty()
    email: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    password: string;

    @IsDecimal()
    @IsOptional()
    @ApiProperty()
    rating: number;

    @IsEnum(['verified', 'unverfied'])
    @IsOptional()
    @ApiProperty()
    status: string;

    @IsEnum(['user', 'admin'])
    @IsOptional()
    @ApiProperty()
    type: string;

    @IsOptional()
    @ApiProperty()
    address: string;

    @IsOptional()
    @ApiProperty()
    lat: string;

    @IsOptional()
    @ApiProperty()
    lng: string;
}