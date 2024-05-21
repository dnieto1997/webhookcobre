import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
@Entity('request_cobre')
export class Cobre {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'text' })
  request: string;

  @Column({ type: 'text' })
  resp: string;

  @Column({ type: 'text', nullable: true })
  reference: string;

  @CreateDateColumn({ type: 'datetime', nullable: true })
  createdAt: Date;
}
