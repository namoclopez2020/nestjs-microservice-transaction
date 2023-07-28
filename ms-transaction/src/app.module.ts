import { Module } from '@nestjs/common';
import { AppController } from './Infrastructure/Controllers/app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import Repositories from './Infrastructure/Repositories';
import { Transaction } from './Infrastructure/Repositories/Entities/transaction.entity';
import { CommandBus, CqrsModule } from '@nestjs/cqrs';
import { CreateTransactionCommandHandler } from './Application/Commands/Handler/create-transaction.handler';
import CreateTransactionUseCase from './Application/UseCases/create-transaction.use-case';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UpdateTransactionStatusCommandHandler } from './Application/Commands/Handler/update-transaction-status.handler';
import UpdateTransactionStatusUseCase from './Application/UseCases/update-transaction-status.use-case';

export const CommandHandlers = [
  CreateTransactionCommandHandler,
  UpdateTransactionStatusCommandHandler
];

export const UseCases = [
  CreateTransactionUseCase,
  UpdateTransactionStatusUseCase
]
@Module({
  imports: [
    CqrsModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [Transaction],
        synchronize: true, // disable on production
      }),
      inject: [ConfigService],
      imports: [ConfigModule]
    }),
    TypeOrmModule.forFeature([Transaction]),
    ClientsModule.registerAsync([
      {
        name: 'TRANSACTION_EMITTER',
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            // consumer: {
            //   groupId: 'ms-transaction-consumer',
            // },
            client: {
              brokers: [configService.get('KAFKA_BROKERS')],
              groupId: 'ms-transaction-consumer-server',
              
              // ssl: true,
              // sasl: {
              //   mechanism: 'plain',
              //   username: configService.get('KAFKA_USERNAME'),
              //   password: configService.get('KAFKA_PASSWORD'),
              // },
            },
          }
        }),
        inject: [ConfigService],
        imports: [ConfigModule],
      },
    ]),
  ],
  controllers: [AppController],
  providers: [...Repositories, ...CommandHandlers, ...UseCases],
})
export class AppModule {}
