import { Module } from '@nestjs/common';
import { AppController } from './Infrastructure/Controllers/app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import Repositories from './Infrastructure/Repositories';
import { Transaction } from './Infrastructure/Repositories/Entities/transaction.entity';
import { CommandBus, CqrsModule } from '@nestjs/cqrs';
import { CreateTransactionCommandHandler } from './Application/Commands/Handler/create-transaction.handler';
import CreateTransactionService from './Domain/Services/create-transaction.service';

export const CommandHandlers = [CreateTransactionCommandHandler];
export const DomainServices = [CreateTransactionService]
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
  ],
  controllers: [AppController],
  providers: [...Repositories, ...CommandHandlers, ...DomainServices],
})
export class AppModule {}
