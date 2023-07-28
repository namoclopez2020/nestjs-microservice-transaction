import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateTransactionCommand } from '../../Application/Commands/Impl/create-transaction.command';
import { CreateTransactionDto } from '../../Application/Dto/Http/create-transaction.dto';
import { v4 as uuidv4 } from 'uuid';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { UpdateTransactionStatusDto } from 'src/Application/Dto/TCP/update-transaction-status.dto';
import { UpdateTransactionStatusCommand } from 'src/Application/Commands/Impl/update-transaction-status.command';

@Controller()
export class AppController {
  constructor(
    private commandBus: CommandBus,
    @Inject('TRANSACTION_EMITTER')
    private readonly kafka: ClientProxy
  ) {}

  @Post('/')
  async createTransaction(
    @Body() body: CreateTransactionDto
  ): Promise<number> {
    const transactionId = uuidv4()
    
    this.commandBus.execute(new CreateTransactionCommand(
      transactionId,
      body.accountExternalIdDebit,
      body.accountExternalIdCredit,
      body.tranferTypeId,
      body.value
    ))

    return transactionId;
  }

  @MessagePattern('transaction.update.status')
  public updateTransactionStatus(@Payload() payload: UpdateTransactionStatusDto){
    this.commandBus.execute(new UpdateTransactionStatusCommand(
      payload.transactionExternalId,
      payload.status
    ))
  }
}