import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsUUID, IsOptional } from 'class-validator';

export class NotificationDto {
    @IsString()
    @IsOptional()
    @ApiProperty()
    title: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    message: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    icon: string;



    @IsString()
    @IsOptional()
    @ApiProperty()
    type: string;



    @IsString()
    @IsOptional()
    @ApiProperty()
    url: string;


    @IsInt()
    @IsOptional()
    @ApiProperty()
    is_read: number;

    @IsOptional()
    @IsUUID()
    @ApiProperty()
    user_id?: string;
}