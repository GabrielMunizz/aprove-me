import { HttpException, Injectable } from '@nestjs/common';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';
import { PrismaService } from 'src/prisma_service/prisma.service';
import { AccountPayable } from '@prisma/client';
import { MessageType } from 'types/MessageType';

@Injectable()
export class PayableService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPayableDto: CreatePayableDto): Promise<AccountPayable> {
    const { value, emissionDate, assignorId } = createPayableDto;

    try {
      const createdPayable = await this.prisma.accountPayable.create({
        data: {
          value,
          emissionDate,
          assignorId,
        },
      });

      return createdPayable;
    } catch (error) {
      console.error(error);
      throw new Error('Falha ao criar um recebível');
    }
  }

  async findAll(): Promise<AccountPayable[]> {
    try {
      const payables = await this.prisma.accountPayable.findMany({
        where: { isDeleted: false },
      });
      return payables;
    } catch (error) {
      console.error(error);
      throw new Error('Falha ao retornar os recebíveis');
    }
  }

  async findOne(id: string): Promise<AccountPayable | null> {
    try {
      const payable = await this.prisma.accountPayable.findUnique({
        where: { id, isDeleted: false },
      });

      return payable;
    } catch (error) {
      console.error(error);
      throw new Error(`Erro ao achar recebível de id ${id}`);
    }
  }

  async update(id: string, updatePayableDto: UpdatePayableDto) {
    if (!id) {
      throw new HttpException('É necessário informar um ID', 400);
    }

    const foundPayable = await this.findOne(id);
    try {
      if (foundPayable) {
        const updatedPayable = await this.prisma.accountPayable.update({
          where: { id },
          data: { ...updatePayableDto, isDeleted: false },
        });

        return updatedPayable;
      }
    } catch (error) {
      console.error(error);
      throw new HttpException('Falha ao alterar informações do recebível', 500);
    }
  }

  async remove(id: string) {
    try {
      const foundPayable = await this.findOne(id);

      if (foundPayable) {
        await this.prisma.accountPayable.update({
          where: { id },
          data: { ...foundPayable, isDeleted: true },
        });

        return { message: 'Recebível deletado com sucesso!' };
      }

      return { message: 'Recebível não encontrado' };
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao deletar recebível.');
    }
  }

  async listDeletedPayables() {
    const deletedPayables = await this.prisma.accountPayable.findMany({
      where: { isDeleted: true },
    });

    return deletedPayables;
  }

  async findDeletedPayable(id: string) {
    if (!id) {
      throw new HttpException('É necessário informar um ID', 400);
    }
    try {
      const foundPayable = await this.prisma.accountPayable.findUnique({
        where: { id, isDeleted: true },
      });

      if (!foundPayable) {
        throw new HttpException('Recebível não encontrado', 404);
      }

      return foundPayable;
    } catch (error) {
      console.error(error);
      throw new HttpException('Falha ao encontrar recebível', 500);
    }
  }

  async recoverPayable(id: string): Promise<MessageType> {
    const foundPayable = await this.findDeletedPayable(id);
    try {
      await this.prisma.accountPayable.update({
        where: { id },
        data: { ...foundPayable, isDeleted: false },
      });

      return { message: 'Recebível recuperado com sucesso!' };
    } catch (error) {
      console.error(error);
      throw new HttpException('Falha ao recuperar recebível', 500);
    }
  }
}
