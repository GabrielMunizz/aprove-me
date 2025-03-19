import { Injectable } from '@nestjs/common';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';
import { PrismaService } from 'src/prisma_service/prisma.service';
import { Assignor } from '@prisma/client';

@Injectable()
export class AssignorService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
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

  async findOne(id: string) {
    try {
      const assignor = await this.prisma.assignor.findUnique({
        where: { id },
      });

      return assignor;
    } catch (error) {
      console.error(error);
      throw new Error('Falha ao encontrar o cedente');
    }
  }

  update(id: string, updateAssignorDto: UpdateAssignorDto) {
    return `This action updates a #${id} assignor`;
  }

  remove(id: string) {
    return `This action removes a #${id} assignor`;
  }
}
