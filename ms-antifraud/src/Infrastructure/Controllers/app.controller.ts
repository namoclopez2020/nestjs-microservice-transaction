import { Controller, Get, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TransactionCreatedDto } from '../../Application/Dto/transaction-created.dto';
import { CheckTransactionUseCase } from '../../Application/UseCases/check-transaction.use-case';

@Controller()
export class AppController {
  constructor(private readonly checkTransactionUseCase: CheckTransactionUseCase) {}

  @MessagePattern('transaction.created')
  public transactionCreated(@Payload() payload: TransactionCreatedDto){
    Logger.log(payload, AppController.name)
    
    this.checkTransactionUseCase.execute(payload)
  }
}