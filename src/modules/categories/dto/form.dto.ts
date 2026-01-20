import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsOptional } from 'class-validator';

export class CategoryDto {
    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'The type of the category',
        example: 'Electronics',
        nullable: true,
    })
    public category?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'The sub-category of the category',
        example: 'Smartphones',
        nullable: true,
    })
    public sub_category?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'The label for the category',
        example: 'Premium Smartphones',
        nullable: true,
    })
    public label?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'The value associated with the category',
        example: 'premium-smartphones',
        nullable: true,
    })
    public value?: string;

    @IsEnum(['active', 'inactive'])
    @IsOptional()
    @ApiProperty({
        description: 'The status of the category',
        enum: ['active', 'inactive'],
        example: 'active',
        nullable: true,
    })
    public status?: string;
}