import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma_service/prisma.service';
import { Users } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(login: string): Promise<Users> {
    const foundUser = await this.prisma.users.findFirst({
      where: { login },
    });

    if (!foundUser) {
      throw new HttpException('Usuário não encontrado', 404);
    }

    return foundUser;
  }
}
