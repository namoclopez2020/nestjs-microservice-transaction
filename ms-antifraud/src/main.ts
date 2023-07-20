import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions } from '@nestjs/microservices/interfaces';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config'; // Importa ConfigService desde @nestjs/config

async function bootstrap() {
  const config = new ConfigService()

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: [config.get('KAFKA_BROKERS')],
        },
        consumer: {
          groupId: 'ms-transaction-antifraud',
        },
      },
    },
  );

  await app.listen();
}

bootstrap();
