import { Entity, Column, Index } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity("notifications")
@Index(['user_id'])
export class Notification extends BaseEntity {
    @Column()
    title: string;

    @Column()
    message: string;

    @Column()
    icon: string;

    @Column()
    type: string;

    @Column()
    url: string;

    @Column({ default: 0 })
    is_read: number;

    @Column({
        type: 'uuid',
        nullable: true
    })
    user_id: string;
}