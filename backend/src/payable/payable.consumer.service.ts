import { Injectable } from '@nestjs/common';
import {
  MessagePattern,
  Payload,
  Ctx,
  RmqContext,
} from '@nestjs/microservices';
import { CreatePayableDto } from './dto/create-payable.dto';
import { PayableService } from './payable.service';

@Injectable()
export class PayableConsumerService {
  constructor(private readonly payableService: PayableService) {}

  @MessagePattern('payables-batch-queue')
  async handlePayablePlaced(
    @Payload() createPayableDto: CreatePayableDto,
    @Ctx() context: RmqContext,
  ) {
    console.log('MENSAGEM NO CONSUMER --->', createPayableDto);
    console.log('Tipo do Payload:', typeof createPayableDto);

    const channel = context.getChannelRef();
    const message = context.getMessage();

    try {
      await this.payableService.create(createPayableDto);
      console.log('Mensagem processada com sucesso');

      channel.ack(message);
    } catch (error) {
      console.error('Erro ao processar a mensagem:', error);

      channel.nack(message);
    }
  }
}
