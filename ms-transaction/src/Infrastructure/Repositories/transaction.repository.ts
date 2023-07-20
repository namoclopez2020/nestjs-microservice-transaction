import { ITransactionRepository } from '../../Domain/Interfaces/transaction.repository.interface';
import { Transaction as TransactionEntity} from '../../Domain/Entities/transaction.entity';
import { UUID } from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './Entities/transaction.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
@Injectable()
export class TransactionRepository implements ITransactionRepository {
    constructor(
        @InjectRepository(Transaction)
        private transactionRepository: Repository<Transaction>
    )
    {}

    async save(transaction: TransactionEntity): Promise<void> 
    {
        await this.transactionRepository.save({
            transactionExternalId: transaction.getTransactionExternalId(),
            accountExternalIdDebit: transaction.getAccountExternalIdDebit(),
            accountExternalIdCredit: transaction.getAccountExternalIdCredit(),
            tranferTypeId: transaction.gettranferTypeId(),
            value: transaction.getValue(),
            status: transaction.getStatus(),
            createdAt: transaction.getCreatedAt(),
            updatedAt: transaction.getUpdatedAt()
        });
    }

    async findById(transactionExternalId: UUID): Promise<TransactionEntity> 
    {
        return
    }

    public test(message: string): string
    {
        return message + 'test'
    }
}
