import { Module } from '@nestjs/common';
import { AssignorService } from './assignor.service';
import { AssignorController } from './assignor.controller';
import { PrismaService } from 'src/prisma_service/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [AssignorController],
  providers: [AssignorService, PrismaService, JwtService],
  exports: [AssignorService],
})
export class AssignorModule {}
