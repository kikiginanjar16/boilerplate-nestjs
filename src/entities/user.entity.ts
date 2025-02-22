import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from './base.entity';
import { OneToMany } from 'typeorm';

@Entity('users')
@Index(['name', 'email', 'phone'])
export class User extends BaseEntity {
  @Column()
  public name: string;

  @Column({ type: 'text', nullable: true })
  public avatar: string;

  @Column({ type: 'int', default: 1 })
  public is_active: number;

  @Column({ unique: true })
  public phone: string;

  @Column({ nullable: true })
  public address: string;

  @Column({ nullable: true })
  public email: string;

  @Column()
  public password: string;

  @Column({
    type: 'enum',
    enum: ['user', 'admin'],
    default: 'user',
  })
  public type: string;

  @Column({ type: 'json', nullable: true })
  public fingerprint: any;

  @Column({ type: 'timestamp', nullable: true, default: () => 'CURRENT_TIMESTAMP' })
  public agree_terms_condition_policy_at: Date;

}
