import { Module } from '@nestjs/common';
import { PayableService } from './payable.service';
import { PayableController } from './payable.controller';
import { PrismaService } from 'src/prisma_service/prisma.service';

@Module({
  controllers: [PayableController],
  providers: [PayableService, PrismaService],
  exports: [PayableService],
})
export class PayableModule {}
