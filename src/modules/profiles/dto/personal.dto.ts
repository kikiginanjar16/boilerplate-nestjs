import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class PersonDto {
    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'The name of the person',
        example: 'John Doe',
        nullable: true,
    })
    public name?: string;

    @IsOptional()
    @ApiProperty({
        description: 'The photo of the person (e.g., URL or file path)',
        example: 'https://example.com/photos/john-doe.jpg',
        nullable: true,
    })
    public foto?: any;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'The address of the person',
        example: '123 Main Street, Jakarta, Indonesia',
        nullable: true,
    })
    public address?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'The step or stage associated with the person (e.g., registration step)',
        example: 'registration',
        nullable: true,
    })
    public step?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'The KTP (National ID) number of the person',
        example: '1234567890123456',
        nullable: true,
    })
    public no_ktp?: string;
}