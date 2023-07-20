import { ICommand } from '@nestjs/cqrs';
import { UUID } from 'crypto';

export class CreateTransactionCommand implements ICommand {
    constructor(
      public readonly transactionExternalId: UUID,
      public readonly accountExternalIdDebit: UUID,
      public readonly accountExternalIdCredit: UUID,
      public readonly tranferTypeId: number,
      public readonly value: number
    ) {}
  }