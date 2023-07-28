import {
    IsUUID,
    IsInt,
    IsNumber,
    IsPositive,
    IsString,
    IsIn,
  } from 'class-validator';
import { UUID } from 'crypto';
import { TransactionStatus } from 'src/Domain/Constants/transaction-status.constant';

export class UpdateTransactionStatusDto {
    @IsString()
    @IsUUID()
    readonly transactionExternalId: UUID;

    @IsString()
    readonly status: TransactionStatus;
}