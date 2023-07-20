import { UUID } from 'crypto';
import { TransactionStatus } from '../../../Domain/Constants/transaction-status.constant';
import { Entity, Generated, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  @Generated('uuid')
  transactionExternalId: UUID;

  @Column()
  accountExternalIdDebit: UUID;

  @Column()
  accountExternalIdCredit: UUID;

  @Column('int')
  tranferTypeId: number;

  @Column({
    type: 'varchar',
    default: TransactionStatus.PENDING
  })
  status: string;

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