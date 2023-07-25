import { Injectable } from '@nestjs/common';
import { TransactionCreatedDto } from '../Dto/transaction-created.dto';

@Injectable()
export class CheckTransactionUseCase {
  execute(
    transaction: TransactionCreatedDto
  ): string {
    return 'Hello World!';
  }
}
