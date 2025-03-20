import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma_service/prisma.service';

@Module({
  imports: [UserModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService, UsersService, PrismaService],
})
export class AuthModule {}
