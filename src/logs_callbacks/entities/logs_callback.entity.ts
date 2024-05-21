// logs-callbacks.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('logs_callbacks')
export class LogsCallback {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  referenceid: number;

  @Column({ nullable: true })
  reference: string;

  @Column({ nullable: true })
  amount: string;

  @Column({ nullable: true })
  method: string;

  @Column({ nullable: true })
  user_created: string;

  @Column({ nullable: true })
  date_notify: string;

  @Column({ nullable: true })
  error_at: string;

  @Column({ nullable: true })
  merchant_id: string;

  @Column({ nullable: true })
  merchant_name: string;

  @Column({ nullable: true })
  currency: string;

  @Column({ nullable: true })
  url_callback: string;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  motivo: string;

  @Column({ nullable: true })
  upload_support: string;

  @Column({ nullable: true, length: 700 })
  json: string;

  @Column({ nullable: true })
  last_uploadsupport: string;

  @Column({ nullable: true })
  resp_callback: string;

  @Column({ nullable: true })
  type_transaction: number;

  @Column({ nullable: true })
  provider: string;

  /* @CreateDateColumn({ type: 'timestamp', nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date; */

  /* @UpdateDateColumn({ type: 'timestamp', nullable: true, default: null })
  updated_at: Date; */
}