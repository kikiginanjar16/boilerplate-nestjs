import { decryptText } from 'pii-cyclops';
import { AfterLoad, Column, Entity, Index } from 'typeorm';

import { PII_ENCRYPTION_KEY } from 'src/common/constant/constant';

import { BaseEntity } from './base.entity';

@Entity('users')
@Index(['name', 'email', 'phone'])
export class User extends BaseEntity {
  @Column()
  public name: string;

  @Column({ type: 'text', nullable: true })
  public avatar: string;

  @Column({ type: 'int', default: 1 })
  public is_active: number;

  @Column({ unique: true, nullable: true })
  public phone: string;

  @Column({ nullable: true })
  public address: string;

  @Column({ nullable: true })
  public email: string;

  @Column({ nullable: true })
  public email_hash: string;

  @Column({ select: false })
  public password: string;

  @Column({
    type: 'enum',
    enum: ['user', 'admin'],
    default: 'user',
  })
  public role: string;

  @Column({ type: 'json', nullable: true })
  public fingerprint: any;

  @Column({ type: 'timestamp', nullable: true, default: () => 'CURRENT_TIMESTAMP' })
  public agree_terms_condition_policy_at: Date;

  @AfterLoad()
  decryptPiiData() {
    if (this.email) {
      try {
        this.email = decryptText(this.email, PII_ENCRYPTION_KEY);
      } catch (error) {
        console.warn('Failed to decrypt email:', error);
      }
    }

    if (this.phone) {
      try {
        this.phone = decryptText(this.phone, PII_ENCRYPTION_KEY);
      } catch (error) {
        console.warn('Failed to decrypt phone:', error);
      }
    }

    if (this.address) {
      try {
        this.address = decryptText(this.address, PII_ENCRYPTION_KEY);
      } catch (error) {
        console.warn('Failed to decrypt address:', error);
      }
    }

    delete this.email_hash;
  }
}
