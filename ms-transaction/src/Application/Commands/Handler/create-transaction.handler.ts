import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTransactionCommand } from '../Impl/create-transaction.command';
import { Inject } from '@nestjs/common';
import { ITransactionRepository } from '../../../Domain/Interfaces/transaction.repository.interface';

@CommandHandler(CreateTransactionCommand)
export class CreateTransactionCommandHandler implements ICommandHandler<CreateTransactionCommand> {
    constructor(
        @Inject('ITransactionRepository')
        private transactionRepository: ITransactionRepository,
    ) {}

    async execute(
        command: CreateTransactionCommand,
    ): Promise<void> {
        return
    }
}