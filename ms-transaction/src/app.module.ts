import { Module } from '@nestjs/common';
import { AppController } from './Infrastructure/Controllers/app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import repositories from './Infrastructure/Repositories';
import { Transaction } from './Infrastructure/Repositories/Entities/transaction.entity';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: 'localhost',
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [],
        synchronize: true,
      }),
      inject: [ConfigService],
      imports: [ConfigModule]
    }),
    TypeOrmModule.forFeature([Transaction])
  ],
  controllers: [AppController],
  providers: [...repositories],
})
export class AppModule {}
