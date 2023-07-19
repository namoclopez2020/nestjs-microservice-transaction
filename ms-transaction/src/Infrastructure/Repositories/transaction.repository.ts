import { ITransactionRepository } from '../../Domain/Interfaces/transaction.repository.interface';
import { Transaction } from '../../Domain/Entities/transaction.entity';
import { UUID } from 'crypto';

export class TransactionRepository implements ITransactionRepository {
  async save(transaction: Transaction): Promise<void> 
  {
    return 
  }

  async findById(transactionExternalId: UUID): Promise<Transaction> {
    return
  }
}
