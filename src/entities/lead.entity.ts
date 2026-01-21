import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, ManyToOne, ManyToMany, OneToOne } from 'typeorm';


export enum LeadStatus {
  NEW = 'new',
  CONTACTED = 'contacted',
  QUALIFIED = 'qualified',
  LOST = 'lost',
  CONVERTED = 'converted'
}


@Entity()
export class Lead {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({type:'varchar', nullable: false, length: 255 })
  public name: string;
  @Column({type:'varchar', unique: true, length: 255 })
  public email: string;
  @Column({type:'varchar', length: 50 })
  public phone: string;
  @Column({type:'varchar', length: 255 })
  public company: string;
  @Column({type:'varchar', length: 100 })
  public source: string;
  @Column({type:'enum', enum: ['new', 'contacted', 'qualified', 'lost', 'converted'] })
  public status: LeadStatus;
  @Column({type:'text',  })
  public notes: string;
  @Column({type:'uuid', nullable: false })
  public category_id: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public created_at: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  public created_by: string;

  @Column({ type: 'uuid', nullable: true })
  public created_id: string;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  public updated_at: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  public updated_by: string;

  @Column({ type: 'uuid', nullable: true })
  public updated_id: string;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  public deleted_at: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  public deleted_by: string;

  @Column({ type: 'uuid', nullable: true })
  public deleted_id: string;
}