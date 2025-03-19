import { Injectable } from '@nestjs/common';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';
import { PrismaService } from 'src/prisma_service/prisma.service';
import { HttpException } from '@nestjs/common';
import { Assignor } from '@prisma/client';
import { MessageType } from 'types/MessageType';

@Injectable()
export class AssignorService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createAssignorDto: CreateAssignorDto,
  ): Promise<Assignor | MessageType> {
    const { document, email, phone, name } = createAssignorDto;
    try {
      const isDocumentRegistered = await this.prisma.assignor.findFirst({
        where: { document },
      });
      if (isDocumentRegistered) {
        console.error('Esse CPF/CNPJ já existe');
        throw new HttpException('Esse CPF/CNPJ já existe', 409);
      }
      const createdAssignor = await this.prisma.assignor.create({
        data: {
          document,
          email,
          phone,
          name,
        },
      });

      return createdAssignor;
    } catch (error) {
      console.error(error);
      throw new HttpException('Falha ao criar um cedente', 500);
    }
  }

  async findAll(): Promise<Assignor[]> {
    const allAssignors = await this.prisma.assignor.findMany({
      where: { isDeleted: false },
    });

    return allAssignors;
  }

  async findOne(id: string): Promise<Assignor | MessageType> {
    if (!id) {
      throw new HttpException('É necessário informar um ID', 400);
    }

    try {
      const foundAssignor = await this.prisma.assignor.findUnique({
        where: { id, isDeleted: false },
      });

      if (!foundAssignor) {
        throw new HttpException('Cedente não encontrado', 404);
      }

      return foundAssignor;
    } catch (error) {
      console.error(error);
      throw new HttpException('Falha ao encontrar o cedente', 500);
    }
  }

  async update(id: string, updateAssignorDto: UpdateAssignorDto) {
    if (!id) {
      throw new HttpException('É necessário informar um ID', 400);
    }

    const foundAssignor = await this.findOne(id);
    try {
      if (foundAssignor) {
        const updatedAssignor = await this.prisma.assignor.update({
          where: { id },
          data: { ...updateAssignorDto, isDeleted: false },
        });

        return updatedAssignor;
      }
    } catch (error) {
      console.error(error);
      throw new HttpException('Falha ao alterar informações do cedente', 500);
    }
  }

  async remove(id: string): Promise<MessageType> {
    if (!id) {
      throw new HttpException('É necessário informar um ID', 400);
    }

    const foundAssignor = await this.findOne(id);
    try {
      await this.prisma.assignor.update({
        where: { id },
        data: { ...foundAssignor, isDeleted: true },
      });

      return { message: 'Cedente deletado com sucesso!' };
    } catch (error) {
      console.error(error);
      throw new HttpException('Falha ao deletar cedente', 500);
    }
  }

  async listDeletedAssignors() {
    const deletedAssignors = await this.prisma.assignor.findMany({
      where: { isDeleted: true },
    });

    console.log(deletedAssignors);

    return deletedAssignors;
  }

  async findDeletedAssignor(id: string) {
    if (!id) {
      throw new HttpException('É necessário informar um ID', 400);
    }
    try {
      const foundAssignor = await this.prisma.assignor.findUnique({
        where: { id, isDeleted: true },
      });

      return foundAssignor;
    } catch (error) {
      console.error(error);
      throw new HttpException('Falha ao encontrar cedente', 500);
    }
  }

  async recoverAssignor(id: string): Promise<MessageType> {
    const foundAssignor = await this.findDeletedAssignor(id);
    try {
      await this.prisma.assignor.update({
        where: { id },
        data: { ...foundAssignor, isDeleted: false },
      });

      return { message: 'Usuário recuperado com sucesso!' };
    } catch (error) {
      console.error(error);
      throw new HttpException('Falha ao recuperar cedente', 500);
    }
  }
}
