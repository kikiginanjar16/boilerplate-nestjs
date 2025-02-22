import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class PersonDto {
    @IsString()
    @IsOptional()
    @ApiProperty()
    name: string;

    @IsOptional()
    @ApiProperty()
    foto?: any;

    @IsString()
    @IsOptional()
    @ApiProperty()
    address: string;


    @IsString()
    @IsOptional()
    @ApiProperty()
    step: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    no_ktp: string;
}
