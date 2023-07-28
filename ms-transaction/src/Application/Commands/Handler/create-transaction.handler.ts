import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTransactionCommand } from '../Impl/create-transaction.command';
import CreateTransactionUseCase from '../../UseCases/create-transaction.use-case';
import { v4 as uuidv4 } from 'uuid';
import { CreateTransactionDto } from '../../../Application/Dto/create-transaction.dto';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@CommandHandler(CreateTransactionCommand)
export class CreateTransactionCommandHandler implements ICommandHandler<CreateTransactionCommand> {
    constructor(
        private CreateTransactionUseCase: CreateTransactionUseCase,
        @Inject('TRANSACTION_EMITTER')
        private readonly kafka: ClientProxy
    ) {}

    async execute(
        command: CreateTransactionCommand,
    ): Promise<void> {
        const transaction: CreateTransactionDto = {
            transactionExternalId: command.transactionExternalId,
            accountExternalIdDebit: command.accountExternalIdDebit,
            accountExternalIdCredit: command.accountExternalIdCredit,
            tranferTypeId: command.tranferTypeId,
            value: command.value,
        }

        await this.CreateTransactionUseCase.execute(transaction)

        this.kafka.emit('transaction.created', JSON.stringify(transaction))

        console.log('emitted')
    }
}