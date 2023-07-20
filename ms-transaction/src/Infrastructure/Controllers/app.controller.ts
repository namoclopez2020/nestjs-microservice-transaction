import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateTransactionCommand } from '../../Application/Commands/Impl/create-transaction.command';
import { CreateTransactionDto } from '../../Application/Dto/Http/create-transaction.dto';

@Controller()
export class AppController {
  constructor(private commandBus: CommandBus) {}

  @Post('/')
  async createTransaction(
    @Body() body: CreateTransactionDto
  ): Promise<number> {
    
    this.commandBus.execute(new CreateTransactionCommand(
      body.accountExternalIdDebit,
      body.accountExternalIdCredit,
      body.tranferTypeId,
      body.value
    ))

    return HttpStatus.CREATED;
  }
}
