import { Injectable } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreatePayableDto } from './dto/create-payable.dto';
import { PayableService } from './payable.service';

@Injectable()
export class PayableConsumerService {
  constructor(private readonly payableService: PayableService) {}

  @MessagePattern('payable-placed')
  async handlePayablePlaced(@Payload() createPayableDto: CreatePayableDto) {
    console.log('Mensagem recebida na fila payable-placed:', createPayableDto);
    return await this.payableService.create(createPayableDto);
  }
}
