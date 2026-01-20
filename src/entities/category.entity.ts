import { Entity, Column, Index } from 'typeorm';

import { BaseEntity } from './base.entity';

@Entity("categories")
@Index(['type', 'status'])
export class Category extends BaseEntity {

    @Column()
    category: string;

    @Column()
    sub_category: string;

    @Column()
    label: string;

    @Column()
    value: string;

    @Column({
        enum: ['active', 'inactive'],
        default: 'active'
    })
    status: string;
}