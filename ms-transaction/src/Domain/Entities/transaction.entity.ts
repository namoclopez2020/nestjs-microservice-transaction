import { UUID } from 'crypto';

export class Transaction {
  constructor(
    private readonly transactionExternalId: UUID,
    private readonly accountExternalIdDebit: UUID,
    private readonly accountExternalIdCredit: UUID,
    private readonly transferTypeId: number,
    private readonly value: number,
    private readonly createdAt: Date,
    private readonly updatedAt: Date,
  ) {}

  getTransactionExternalId(): UUID {
    return this.transactionExternalId;
  }

  getAccountExternalIdDebit(): UUID {
    return this.accountExternalIdDebit;
  }

  getAccountExternalIdCredit(): UUID {
    return this.accountExternalIdCredit;
  }

  getTransferTypeId(): number {
    return this.transferTypeId;
  }

  getValue(): number {
    return this.value;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }
}
