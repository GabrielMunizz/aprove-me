import { Injectable } from '@nestjs/common';
import { CreatePayableDto } from './dto/create-payable.dto';
// import { UpdatePayableDto } from './dto/update-payable.dto';
import { PrismaService } from 'src/prisma_service/prisma.service';
import { AccountPayable } from '@prisma/client';

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
        where: { id },
      });

      return payable;
    } catch (error) {
      console.error(error);
      throw new Error(`Erro ao achar recebível de id ${id}`);
    }
  }

  // update(id: number, updatePayableDto: UpdatePayableDto) {
  //   return `This action updates a #${id} payable`;
  // }

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
}
