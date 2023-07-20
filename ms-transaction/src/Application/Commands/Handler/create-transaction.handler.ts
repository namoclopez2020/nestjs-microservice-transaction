import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTransactionCommand } from '../Impl/create-transaction.command';
import CreateTransactionService from '../../../Domain/Services/create-transaction.service';
import { v4 as uuidv4 } from 'uuid';
import { CreateTransactionDto } from '../../../Application/Dto/create-transaction.dto';

@CommandHandler(CreateTransactionCommand)
export class CreateTransactionCommandHandler implements ICommandHandler<CreateTransactionCommand> {
    constructor(
        private CreateTransactionService: CreateTransactionService
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

        await this.CreateTransactionService.execute(transaction)
    }
}