import { CreateDateColumn, UpdateDateColumn, Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'varchar', length: 255, nullable: true })
    created_by: string;

    @Column({ type: 'uuid',nullable: true  })
    created_id: string;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @Column({ type: 'varchar', length: 255, nullable: true })
    updated_by: string;

    @Column({ type: 'uuid', nullable: true })
    updated_id: string;

    @UpdateDateColumn({ type: 'timestamp', nullable: true })
    deleted_at: Date;

    @Column({ type: 'varchar', length: 255, nullable: true })
    deleted_by: string;

    @Column({ type: 'uuid', nullable: true  })
    deleted_id: string;
}