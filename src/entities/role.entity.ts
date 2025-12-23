import { Entity, Column } from 'typeorm';

import { BaseEntity } from './base.entity';

@Entity("roles")
export class Role extends BaseEntity {

    @Column()
    title: string;

    @Column({
        type: 'text',
        nullable: true
    })
    description: string;
}