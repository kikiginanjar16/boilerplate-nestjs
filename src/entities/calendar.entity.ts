
import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('calendars')
export class Calendar  extends BaseEntity{

  @Column({ type: 'varchar', length: 255 })
  public title: string;

  @Column({ type: 'text', nullable: true })
  public description: string;

  @Column({ nullable: true })
  public date: Date;

  @Column({ nullable: true })
  public year: string;

}
