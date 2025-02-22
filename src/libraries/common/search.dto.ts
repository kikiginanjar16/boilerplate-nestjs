import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class PaginateDto {
    @IsNumber()
    @ApiProperty()
    limit: number;


    @IsNumber()
    @ApiProperty()
    page: number;


    @IsOptional()
    @ApiProperty()
    search: string;

    @IsOptional()
    @ApiProperty()
    status: string;
}
