import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class RegisterDto {
    @IsEmail()
    @ApiProperty({
        description: 'The email address of the user for registration',
        example: 'john.doe@example.com',
    })
    public email: string;

    @IsString()
    @ApiProperty({
        description: 'The password for the user account',
        example: 'securePassword123',
    })
    public password: string;

    @IsString()
    @ApiProperty({
        description: 'The name of the user',
        example: 'John Doe',
    })
    public name: string;

    @ApiProperty({
        description: 'The company associated with the user (e.g., name or details)',
        example: 'Example Corp',
    })
    public company: any;

    @ApiProperty({
        description: 'The phone number of the user',
        example: '+1234567890',
    })
    public phone: string;

    @ApiProperty({
        description: 'The address of the user',
        example: '123 Main St, Anytown, USA',
    })
    public address: string;
}