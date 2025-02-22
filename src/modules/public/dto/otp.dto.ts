import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class OtpDto {
    @ApiProperty()
    @IsOptional()
    phone: string;
  
    @ApiProperty()
    @IsOptional()
    code: string;

    @ApiProperty()
    @IsOptional()
    password: string;
  }