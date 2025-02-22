import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto {
    @ApiProperty()
    phone: string;
  
    @ApiProperty()
    password: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    company: any;
  }