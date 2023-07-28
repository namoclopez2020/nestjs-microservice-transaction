import { Inject, Injectable } from '@nestjs/common';
import { ITransactionRepository } from '../../Domain/Interfaces/transaction.repository.interface';
import { Transaction } from '../../Domain/Entities/transaction.entity';
import { UpdateTransactionStatusDto } from '../Dto/update-transaction-status.dto';

@Injectable()
export default class UpdateTransactionStatusUseCase {
  constructor(
    @Inject('ITransactionRepository')
    private transactionRepository: ITransactionRepository,
  ) {}

  public async execute(updateTransactionStatusDto: UpdateTransactionStatusDto): Promise<void> {
    const transactionFound = await this.transactionRepository.findById(updateTransactionStatusDto.transactionExternalId)

    const transaction = new Transaction({
        transactionExternalId: transactionFound.getTransactionExternalId(),
        accountExternalIdDebit: transactionFound.getAccountExternalIdDebit(),
        accountExternalIdCredit: transactionFound.getAccountExternalIdCredit(),
        tranferTypeId: transactionFound.gettranferTypeId(),
        value: transactionFound.getValue(),
        status: updateTransactionStatusDto.status, 
        createdAt: transactionFound.getCreatedAt(),
        updatedAt: new Date(),
    });

    await this.transactionRepository.update(transaction);
  }
}
