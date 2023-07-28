import { ICommand } from '@nestjs/cqrs';
import { UUID } from 'crypto';
import { TransactionStatus } from 'src/Domain/Constants/transaction-status.constant';

export class UpdateTransactionStatusCommand implements ICommand {
    constructor(
      public readonly transactionExternalId: UUID,
      public readonly status: TransactionStatus,
    ) {}
  }