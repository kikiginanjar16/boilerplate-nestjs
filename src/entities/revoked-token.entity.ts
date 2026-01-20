import { Column, Entity } from 'typeorm';

import { BaseEntity } from './base.entity';

@Entity('revoked_tokens')
export class RevokedToken extends BaseEntity {
  @Column({ type: 'uuid', nullable: true })
  public user_id: string;

  @Column({ type: 'varchar', length: 64, unique: true })
  public token_hash: string;

  @Column({ type: 'timestamp', nullable: true })
  public expires_at: Date;
}
