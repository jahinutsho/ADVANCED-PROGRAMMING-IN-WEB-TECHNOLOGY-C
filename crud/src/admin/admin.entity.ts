import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity("admin")
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid', unique: true, default: () => 'gen_random_uuid()' })
  uniqueId: string;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  joiningDate: Date;

  @Column({ length: 30, default: 'Unknown' })
  country: string;
}