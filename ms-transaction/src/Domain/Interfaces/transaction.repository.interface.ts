import { UUID } from 'crypto';
import { Transaction } from '../Entities/transaction.entity'

export interface ITransactionRepository {
  save(transaction: Transaction): void;
  findById(transactionExternalId: UUID): Promise<Transaction>;
}
