import { Module } from '@nestjs/common';
import { PayableService } from './payable.service';
import { PayableController } from './payable.controller';
import { PrismaService } from 'src/prisma_service/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [PayableController],
  providers: [PayableService, PrismaService, JwtService],
  exports: [PayableService],
})
export class PayableModule {}
