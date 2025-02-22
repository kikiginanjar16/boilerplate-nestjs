import { ApiProperty } from "@nestjs/swagger";

export class ForgotDto {
    @ApiProperty()
    phone: string;
  }