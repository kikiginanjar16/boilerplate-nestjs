import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, ManyToOne, ManyToMany, OneToOne } from 'typeorm';



@Entity()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({type:'varchar', nullable: false, length: 255 })
  public title: string;
  @Column({type:'text',  })
  public description: string;
  @Column({type:'varchar', length: 255 })
  public youtube_url: string;
  @Column({type:'varchar', length: 255 })
  public poc_url: string;
  @Column({type:'varchar', length: 255 })
  public slide_url: string;

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