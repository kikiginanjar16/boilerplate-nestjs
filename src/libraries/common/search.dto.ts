import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class PaginateDto {
    @IsNumber()
    @ApiProperty({
        example: 10,
        description: 'Limit per page',
    })
    limit: number;


    @IsNumber()
    @ApiProperty({
        example: 1,
        description: 'Page number',
    })
    page: number;


    @IsOptional()
    @ApiProperty({
        example:'',
        description: 'Search term',
    })
    search: string;

    @IsOptional()
    @ApiProperty({
        example: '',
        description: 'Notification status',
    })
    status: string;
}
