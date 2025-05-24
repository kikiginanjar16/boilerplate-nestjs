import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class ForgotDto {
    @IsEmail()
    @ApiProperty({
        description: 'The email address of the user requesting a password reset',
        example: 'john.doe@example.com',
    })
    public email: string;
}