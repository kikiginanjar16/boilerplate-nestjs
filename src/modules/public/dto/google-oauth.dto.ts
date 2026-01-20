import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GoogleOauthDto {
  @IsString()
  @ApiProperty({
    description: 'Google ID token from client-side OAuth',
    example: 'eyJhbGciOiJSUzI1NiIsImtpZCI6Ij...',
  })
  public id_token: string;
}
