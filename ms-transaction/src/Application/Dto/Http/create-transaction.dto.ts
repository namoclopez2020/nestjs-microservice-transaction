import {
    IsUUID,
    IsInt,
    IsNumber,
    IsPositive,
    IsString,
    IsIn,
  } from 'class-validator';
import { UUID } from 'crypto';

export class CreateTransactionDto {
    @IsString()
    @IsUUID()
    readonly accountExternalIdDebit: UUID;
  
    @IsString()
    @IsUUID()
    readonly accountExternalIdCredit: UUID;
  
    @IsInt()
    @IsPositive()
    @IsIn([1, 2, 3])
    readonly tranferTypeId: number;
  
    @IsNumber()
    @IsPositive()
    readonly value: number;
}