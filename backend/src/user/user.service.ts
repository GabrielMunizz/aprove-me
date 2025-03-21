import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma_service/prisma.service';
import { Users } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { login, password } = createUserDto;

    const userAlreadyExists = await this.findOne(login);
    if (userAlreadyExists) {
      throw new HttpException('Esse login já existe', 409);
    }
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await this.prisma.users.create({
        data: {
          login,
          password: hashedPassword,
          role: 'private',
        },
      });

      return { message: 'Usuário cadastrado com sucesso!' };
    } catch (error) {
      console.error(error);
      throw new HttpException('Falha ao cadastrar usuário', 500);
    }
  }

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
