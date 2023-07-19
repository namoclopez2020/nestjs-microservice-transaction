import { UUID } from 'crypto';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  transactionExternalId: UUID;

  @Column()
  accountExternalIdDebit: UUID;

  @Column()
  accountExternalIdCredit: UUID;

  @Column('int')
  transferTypeId: number;

  @Column({ type: 'decimal', precision: 17, scale: 2 })
  value: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}