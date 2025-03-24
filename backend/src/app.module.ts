import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma_service/prisma.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PayableModule } from './payable/payable.module';
import { AssignorModule } from './assignor/assignor.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { UsersService } from './user/user.service';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';

@Module({
  imports: [
    PayableModule,
    AssignorModule,
    JwtModule,
    AuthModule,
    ClientsModule.register([
      {
        name: 'PAYABLES_BATCH_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbitmq:5672'],
          queue: 'payables-batch-queue',
          queueOptions: {
            durable: true,
          },
          noAck: false,
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, AuthService, AuthGuard, UsersService],
})
export class AppModule {}
