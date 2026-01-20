import { Column, Entity } from 'typeorm';

import { BaseEntity } from './base.entity';

@Entity('auth_audits')
export class AuthAudit extends BaseEntity {
  @Column({ type: 'uuid', nullable: true })
  public user_id: string;

  @Column({ type: 'varchar', length: 32 })
  public action: string;

  @Column({ type: 'varchar', length: 16 })
  public status: string;

  @Column({ type: 'varchar', length: 64, nullable: true })
  public identifier: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  public ip: string;

  @Column({ type: 'text', nullable: true })
  public user_agent: string;

  @Column({ type: 'text', nullable: true })
  public message: string;
}
