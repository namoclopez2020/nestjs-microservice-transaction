import { ITransactionRepository } from '../../Domain/Interfaces/transaction.repository.interface';
import { Transaction as TransactionEntity} from '../../Domain/Entities/transaction.entity';
import { UUID } from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './Entities/transaction.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4, parse as uuidParse } from 'uuid';
import { TransactionStatus } from 'src/Domain/Constants/transaction-status.constant';
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

    async update(transaction: TransactionEntity): Promise<void> 
    {
        await this.transactionRepository.update(
            { transactionExternalId: transaction.getTransactionExternalId() },
            {
                accountExternalIdDebit: transaction.getAccountExternalIdDebit(),
                accountExternalIdCredit: transaction.getAccountExternalIdCredit(),
                tranferTypeId: transaction.gettranferTypeId(),
                value: transaction.getValue(),
                status: transaction.getStatus(),
                updatedAt: transaction.getUpdatedAt() 
            },
        );
    }

    async findById(transactionExternalId: UUID): Promise<TransactionEntity> 
    {
        const transaction = await this.transactionRepository.findOne({
            where: { transactionExternalId: transactionExternalId },
        });

        return transaction ? new TransactionEntity({
            transactionExternalId: transaction.transactionExternalId,
            accountExternalIdDebit: transaction.accountExternalIdDebit,
            accountExternalIdCredit: transaction.accountExternalIdCredit,
            value: transaction.value,
            status: transaction.status,
            tranferTypeId: transaction.tranferTypeId,
            createdAt: transaction.createdAt,
            updatedAt: transaction.updatedAt
        }) : null;
    }
}
