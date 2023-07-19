import { TransactionRepository } from './transaction.repository';

export default [
  {
    provide: 'ITransactionRepository',
    useClass: TransactionRepository,
  }
];
