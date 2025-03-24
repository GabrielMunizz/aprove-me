import { Module } from '@nestjs/common';
import { PayableService } from './payable.service';
import { PayableController } from './payable.controller';
import { PrismaService } from 'src/prisma_service/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PayableConsumerService } from './payable.consumer.service';

export const PayableBatchService = ClientsModule.register([
  {
    name: 'PAYABLES_BATCH_SERVICE',
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://aproveme:aproveme@rabbitmq:5672'],
      queue: 'payables-batch-queue',
      queueOptions: {
        durable: true,
      },
      noAck: true,
    },
  },
]);

@Module({
  imports: [PayableBatchService],
  controllers: [PayableController],
  providers: [
    PayableService,
    PrismaService,
    JwtService,
    PayableConsumerService,
  ],
  exports: [PayableService],
})
export class PayableModule {}
