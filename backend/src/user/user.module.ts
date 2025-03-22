import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { PrismaService } from 'src/prisma_service/prisma.service';
import { UserController } from './user.controller';

@Module({
  providers: [UsersService, PrismaService],
  controllers: [UserController],
})
export class UserModule {}
