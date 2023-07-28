import { Injectable } from '@nestjs/common';
import { TransactionCreatedDto } from '../Dto/transaction-created.dto';
import { TransactionStatus } from '../../Domain/Constants/transaction-status.constant';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { stat } from 'fs';
@Injectable()
export class CheckTransactionUseCase {
    constructor(
        @Inject('TRANSACTION_ANTIFRAUD_EMITTER')
        private readonly kafka: ClientProxy
    ) {}

    execute(
        transaction: TransactionCreatedDto,
    ): void {
        const status = transaction.value > 1000 ? TransactionStatus.APPROVED : TransactionStatus.REJECTED
        
        this.kafka.emit('transaction.update.status', JSON.stringify(
            {
                'transactionExternalId': transaction.transactionExternalId,
                'status': status
            }
        ))
    }
}
