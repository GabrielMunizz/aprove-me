import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma_service/prisma.service';

import { PayableModule } from './payable/payable.module';
import { AssignorModule } from './assignor/assignor.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { UsersService } from './user/user.service';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';

@Module({
  imports: [PayableModule, AssignorModule, JwtModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, AuthService, AuthGuard, UsersService],
})
export class AppModule {}
