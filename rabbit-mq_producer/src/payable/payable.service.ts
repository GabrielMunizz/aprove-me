import { Inject, Injectable } from '@nestjs/common';
import { CreatePayableBatchDto } from './dto/createPayableBatch.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PayableService {
  constructor(
    @Inject('PAYABLES_BATCH_SERVICE') private rabbitClient: ClientProxy,
  ) {}
  createPayableBatch(createPayableBatchDto: CreatePayableBatchDto) {
    this.rabbitClient.emit('payable-placed', createPayableBatchDto);
    return { message: 'Payable placed' };
  }
}
