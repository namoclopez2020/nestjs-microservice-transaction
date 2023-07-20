import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      consumer: {
        groupId: 'ms-transaction-consumer',
      },
      client: {
        brokers: [configService.get('KAFKA_BROKERS')],
        // groupId: 'ms-transaction-consumer',
        // ssl: true,
        // sasl: {
        //   mechanism: 'plain',
        //   username: configService.get('KAFKA_USERNAME'),
        //   password: configService.get('KAFKA_PASSWORD'),
        // },
      },
    }
  } as MicroserviceOptions)

  app.startAllMicroservices()
  
  const options = new DocumentBuilder()
  .setTitle('POC NestJS + Kakfa')
  .setDescription('Documentation Proyect')
  .setVersion('1.0')
  .addTag('NestJS + KAFKA')
  .build()

  const document = SwaggerModule.createDocument(app, options)

  SwaggerModule.setup('api/docs', app, document, {
    explorer: true,
    swaggerOptions: {
      filter: true,
      showRequestDuration: true,
    }
  })

  await app.listen(configService.get<number>('APP_PORT'));
}
bootstrap();
