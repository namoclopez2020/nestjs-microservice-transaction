import { Module } from '@nestjs/common';
import { AppController } from './Infrastructure/Controllers/app.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CheckTransactionUseCase } from './Application/UseCases/check-transaction.use-case';

const useCases = [CheckTransactionUseCase]
@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.registerAsync([
      {
        name: 'TRANSACTION_EMITTER',
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              brokers: [configService.get('KAFKA_BROKERS')],
              groupId: 'ms-transaction-consumer-server',
            },
          }
        }),
        inject: [ConfigService],
        imports: [ConfigModule],
      },
    ]),
  ],
  controllers: [AppController],
  providers: [...useCases],
})
export class AppModule {}
