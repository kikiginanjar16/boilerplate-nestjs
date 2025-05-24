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
}