import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma_service/prisma.service';

import { PayableModule } from './payable/payable.module';
import { AssignorModule } from './assignor/assignor.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [PayableModule, AssignorModule, UserModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
