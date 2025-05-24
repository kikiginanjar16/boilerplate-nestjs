import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsUUID, IsOptional } from 'class-validator';

export class NotificationDto {
    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'The title of the notification',
        example: 'New Order Received',
        nullable: true,
    })
    public title?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'The message content of the notification',
        example: 'A new order has been placed for product XYZ.',
        nullable: true,
    })
    public message?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'The icon associated with the notification',
        example: 'fa-bell',
        nullable: true,
    })
    public icon?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'The type of the notification',
        example: 'info',
        nullable: true,
    })
    public type?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'The URL linked to the notification',
        example: '/orders/12345',
        nullable: true,
    })
    public url?: string;

    @IsInt()
    @IsOptional()
    @ApiProperty({
        description: 'The read status of the notification (0 for unread, 1 for read)',
        example: 0,
        nullable: true,
    })
    public is_read?: number;

    @IsUUID()
    @IsOptional()
    @ApiProperty({
        description: 'The ID of the user receiving the notification',
        example: '123e4567-e89b-12d3-a456-426614174000',
        nullable: true,
    })
    public user_id?: string;
}