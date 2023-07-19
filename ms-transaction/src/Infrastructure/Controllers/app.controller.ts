import { Controller, Get } from '@nestjs/common';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ITransactionRepository } from 'src/Domain/Interfaces/transaction.repository.interface';

@Controller()
export class AppController {
  constructor(
    @Inject('ITransactionRepository')
    private transactionRepository: ITransactionRepository,
  ) {}

  @Get()
  getHello(): string {
    return this.transactionRepository.test('hola')
  }
}
