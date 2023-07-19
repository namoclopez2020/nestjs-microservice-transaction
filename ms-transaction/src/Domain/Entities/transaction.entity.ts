import { UUID } from 'crypto';
import { TransactionStatus } from '../Constants/transaction-status.constant';

export type TransactionProperties = {
    readonly transactionExternalId: UUID,
    readonly accountExternalIdDebit: UUID,
    readonly accountExternalIdCredit: UUID,
    readonly transferTypeId: number,
    readonly value: number,
    readonly status: TransactionStatus,
    readonly createdAt: Date,
    readonly updatedAt: Date,
};

export class Transaction {
    private readonly transactionExternalId: UUID
    private readonly accountExternalIdDebit: UUID
    private readonly accountExternalIdCredit: UUID
    private readonly transferTypeId: number
    private readonly value: number
    private readonly status: TransactionStatus
    private readonly createdAt: Date
    private readonly updatedAt: Date

    constructor(properties: TransactionProperties) {
        Object.assign(this, properties);
    }

    getTransactionExternalId(): UUID {
        return this.transactionExternalId;
    }

    getStatus(): TransactionStatus {
        return this.status;
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
