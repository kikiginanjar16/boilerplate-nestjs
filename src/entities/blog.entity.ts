import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('blogs')
@Index(['title', 'author', 'category'])
export class Blog extends BaseEntity {

    @Column({ type: 'varchar', length: 255 })
    title: string;

    @Column({ type: 'json', nullable: true })
    image: any;

    @Column({ type: 'text' })
    content: string;

    @Column({ type: 'varchar', length: 255 })
    author: string;

    @Column({ type: 'varchar', length: 255 })
    category: string;

    @Column({ default: 0 })
    status: number;

    @Column({ type: 'uuid', nullable: true })
    category_id: string;
}