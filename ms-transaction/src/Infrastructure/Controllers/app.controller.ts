import { Controller, Get } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { TransactionStatus } from 'src/Domain/Constants/transaction-status.constant';
import { Transaction } from 'src/Domain/Entities/transaction.entity';
import { ITransactionRepository } from 'src/Domain/Interfaces/transaction.repository.interface';
import { v4 as uuidv4 } from 'uuid';

@Controller()
export class AppController {
  constructor(
    @Inject('ITransactionRepository')
    private transactionRepository: ITransactionRepository,
  ) {}

  @Get()
  async getHello(): Promise<string> {
    const transaction = new Transaction({
      transactionExternalId: uuidv4(),
      accountExternalIdDebit: uuidv4(),
      accountExternalIdCredit: uuidv4(),
      transferTypeId: 1,
      value: 120,
      status: TransactionStatus.PENDING, // Este valor es válido y no generará un error
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    await this.transactionRepository.save(transaction)

    return 'listo'
  }
}
