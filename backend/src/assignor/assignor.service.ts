import { Injectable } from '@nestjs/common';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';
import { PrismaService } from 'src/prisma_service/prisma.service';
import { Assignor } from '@prisma/client';

@Injectable()
export class AssignorService {
  constructor(private readonly prisma: PrismaService) {}

  async createAssignor(
    createAssignorDto: CreateAssignorDto,
  ): Promise<Assignor | { message: string }> {
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

  findAll() {
    return `This action returns all assignor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} assignor`;
  }

  update(id: number, updateAssignorDto: UpdateAssignorDto) {
    return `This action updates a #${id} assignor`;
  }

  remove(id: number) {
    return `This action removes a #${id} assignor`;
  }
}
