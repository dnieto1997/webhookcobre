// aliado.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('aliado')
export class Aliado {
  @PrimaryGeneratedColumn()
  uid: number;

  @Column({ type: 'varchar', length: 300, nullable: false })
  token: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  image: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  merchant: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  phone: string;

  @Column({ type: 'tinytext', nullable: false })
  url_response: string;

  @Column({ type: 'decimal', precision: 14, scale: 2, nullable: false, default: 0.00 })
  pse_fijo: number;

  @Column({ type: 'decimal', precision: 14, scale: 2, nullable: false, default: 0.00 })
  pse_porcentaje: number;

  @Column({ type: 'decimal', precision: 14, scale: 2, nullable: false, default: 0.00 })
  nequi_fijo: number;

  @Column({ type: 'decimal', precision: 14, scale: 2, nullable: false, default: 0.00 })
  nequi_porcentaje: number;

  @Column({ type: 'decimal', precision: 14, scale: 2, nullable: false, default: 0.00 })
  cashout: number;

  @Column({ type: 'int', default: 0 })
  banco: number;

  @Column({ type: 'decimal', precision: 14, scale: 2, default: 0.00 })
  wallet_cashin: number;

  @Column({ type: 'decimal', precision: 14, scale: 2, default: 0.00 })
  wallet_cashout: number;

  @Column({ type: 'decimal', precision: 14, scale: 2, nullable: false, default: 0.19 })
  iva: number;

  @Column({ type: 'int', nullable: false, default: 1 })
  pais: number;

  @Column({ type: 'int', nullable: false })
  status: number;

  @CreateDateColumn({ type: 'timestamp', nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true, default: null })
  updated_at: Date;
}