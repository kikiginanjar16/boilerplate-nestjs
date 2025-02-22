import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity("menus")
export class Menu extends BaseEntity {

    @Column()
    title: string;
    
    @Column()
    icon: string;
    
    @Column()
    url: string;

    @Column({
        enum: ['active', 'inactive'],
        default: 'active'
    })
    status: string;
}