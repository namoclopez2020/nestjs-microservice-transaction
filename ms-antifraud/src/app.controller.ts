import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('transaction.created')
  public messageCreate(@Payload() payload: any){
    console.log('test')
    Logger.log(payload, AppController.name)
  }
}
