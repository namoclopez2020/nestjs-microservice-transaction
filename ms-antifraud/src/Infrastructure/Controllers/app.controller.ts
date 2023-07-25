import { Controller, Get, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TransactionCreatedDto } from '../../Application/Dto/transaction-created.dto';
import { CheckTransactionUseCase } from '../../Application/UseCases/check-transaction.use-case';

@Controller()
export class AppController {
  constructor(private readonly checkTransactionUseCase: CheckTransactionUseCase) {}

  @MessagePattern('transaction.created')
  public transactionCreated(@Payload() payload: TransactionCreatedDto){
    console.log('test')
    Logger.log(payload, AppController.name)
    let test = this.checkTransactionUseCase.execute(payload)

    console.log('print->', test)
  }
}