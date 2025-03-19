import { Injectable } from '@nestjs/common';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';
import { PrismaService } from 'src/prisma_service/prisma.service';
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
        return { message: "Esse CPF/CNPJ já existe'" };
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
      throw new Error('Falha ao criar um cedente');
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
      return { message: 'É necessário informar um ID' };
    }

    try {
      const foundAssignor = await this.prisma.assignor.findUnique({
        where: { id },
      });

      if (!foundAssignor) {
        return { message: 'Cedente não encontrado' };
      }

      return foundAssignor;
    } catch (error) {
      console.error(error);
      throw new Error('Falha ao encontrar o cedente');
    }
  }

  update(id: string, updateAssignorDto: UpdateAssignorDto) {
    return `This action updates a #${id} assignor`;
  }

  async remove(id: string): Promise<MessageType> {
    if (!id) {
      return { message: 'É necessário informar um ID' };
    }

    try {
      const foundAssignor = await this.findOne(id);
      if (!foundAssignor) {
        return { message: 'Cedente não encontrado' };
      }

      await this.prisma.assignor.update({
        where: { id },
        data: { ...foundAssignor, isDeleted: true },
      });

      return { message: 'Cedente deletado com sucesso!' };
    } catch (error) {
      console.error(error);
      throw new Error('Falha ao deletar cedente');
    }
  }
}
