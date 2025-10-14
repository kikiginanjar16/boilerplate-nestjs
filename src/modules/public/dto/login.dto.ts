import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
    @IsEmail()
    @ApiProperty({
        description: 'The email address used for login',
        example: 'john.doe@example.com',
    })
    public username: string;

    @IsString()
    @ApiProperty({
        description: 'The password for login',
        example: 'securePassword123',
    })
    public password: string;
}