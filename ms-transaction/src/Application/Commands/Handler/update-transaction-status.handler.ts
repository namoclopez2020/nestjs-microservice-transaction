import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UpdateTransactionStatusCommand } from '../Impl/update-transaction-status.command';
import UpdateTransactionStatusUseCase from '../../../Application/UseCases/update-transaction-status.use-case';
import { UpdateTransactionStatusDto } from 'src/Application/Dto/update-transaction-status.dto';

@CommandHandler(UpdateTransactionStatusCommand)
export class UpdateTransactionStatusCommandHandler implements ICommandHandler<UpdateTransactionStatusCommand> {
    constructor(
        private updateTransactionStatusUseCase: UpdateTransactionStatusUseCase,
        @Inject('TRANSACTION_EMITTER')
        private readonly kafka: ClientProxy
    ) {}

    async execute(
        command: UpdateTransactionStatusCommand,
    ): Promise<void> {
        const updateTransactionStatusDto: UpdateTransactionStatusDto = {
            transactionExternalId: command.transactionExternalId,
            status: command.status
        }

        await this.updateTransactionStatusUseCase.execute(updateTransactionStatusDto)
    }
}