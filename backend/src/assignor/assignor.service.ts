import { Injectable } from '@nestjs/common';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { UpdateAssignorDto } from './dto/update-assignor.dto';
import { PrismaService } from 'src/prisma_service/prisma.service';

@Injectable()
export class AssignorService {
  constructor(private readonly prisma: PrismaService) {}

  async createAssignor(createAssignorDto: CreateAssignorDto) {
    const { document, email, phone, name } = createAssignorDto;
    try {
      const createdAssignor = await this.prisma.assignor.create({
        document,
        email,
        phone,
        name,
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
