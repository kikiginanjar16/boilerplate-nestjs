import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class OtpDto {
    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'The phone number associated with the OTP',
        example: '+6281234567890',
        nullable: true,
    })
    public phone?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'The OTP code sent to the user',
        example: '123456',
        nullable: true,
    })
    public code?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'The password to be set or verified with the OTP',
        example: 'newSecurePassword123',
        nullable: true,
    })
    public password?: string;
}