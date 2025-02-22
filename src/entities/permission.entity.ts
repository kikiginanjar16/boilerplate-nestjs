import { Entity, Column, Index } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity("permissions")
@Index(['menu_id', 'role_id'])
export class Permission extends BaseEntity {

    @Column({
        type: 'uuid',
        nullable: true
    })
    menu_id: string;

    @Column({
        type: 'uuid',
        nullable: true
    })
    role_id: string;
    
    @Column({
        type: 'int',
        default: 0
    })
    create: number;

    @Column({
        type: 'int',
        default: 0
    })
    read: number;


    @Column({
        type: 'int',
        default: 0
    })
    update: number;


    @Column({
        type: 'int',
        default: 0
    })
    delete: number;


    @Column({
        type: 'int',
        default: 0
    })
    approve: number;
    
}