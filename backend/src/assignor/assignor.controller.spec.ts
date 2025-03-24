import { Test, TestingModule } from '@nestjs/testing';
import { AssignorController } from './assignor.controller';
import { AssignorService } from './assignor.service';
import { PrismaService } from 'src/prisma_service/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CreateAssignorDto } from './dto/create-assignor.dto';

describe('AssignorController', () => {
  let controller: AssignorController;
  let service: AssignorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssignorController],
      providers: [AssignorService, PrismaService, JwtService],
    }).compile();

    controller = module.get<AssignorController>(AssignorController);
    service = module.get<AssignorService>(AssignorService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('payables controller', () => {
    it('Should create an assignor', async () => {
      const createAssignorDto: CreateAssignorDto = {
        document: '99999999999',
        email: 'teste@teste.com',
        phone: '(32) 984863437',
        name: 'Testando da Silva',
      };

      const mockServiceResponse = {
        id: '7c9a1eb0-20e0-4f4f-a62a-8c459b6385d2',
        ...createAssignorDto,
        isDeleted: false,
      };

      jest.spyOn(service, 'create').mockResolvedValue(mockServiceResponse);

      const response = await controller.createAssignor(createAssignorDto);

      expect(response).toEqual(mockServiceResponse);
    });

    it('Should get all assignors', async () => {
      const allAssignors = [
        {
          id: '7c9a1eb0-20e0-4f4f-a62a-8c459b6385d2',
          document: '99999999999',
          email: 'testando@teste.com',
          phone: '99999999999',
          name: 'Testando da Silva',
          isDeleted: false,
        },
        {
          id: '1a62f746-0e89-4c39-9749-6859d91ed8c9',
          document: '99999999999',
          email: 'teste@teste.com',
          phone: '99999999999',
          name: 'Teste Oliveira',
          isDeleted: false,
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(allAssignors);

      const response = await controller.findAllAssignors();

      expect(response).toEqual(allAssignors);
    });

    it('Should get an assignor by ID', async () => {
      const id = '7c9a1eb0-20e0-4f4f-a62a-8c459b6385d2';
      const assignor = {
        id: '7c9a1eb0-20e0-4f4f-a62a-8c459b6385d2',
        document: '99999999999',
        email: 'testando@teste.com',
        phone: '99999999999',
        name: 'Testando da Silva',
        isDeleted: false,
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(assignor);

      const response = await controller.findOneAssignor(id);

      expect(response).toEqual(assignor);
    });

    it('Should update an assignor', async () => {
      const id = '7c9a1eb0-20e0-4f4f-a62a-8c459b6385d2';
      const assignor = {
        id: '7c9a1eb0-20e0-4f4f-a62a-8c459b6385d2',
        document: '99999999999',
        email: 'testando@teste.com',
        phone: '99999999999',
        name: 'Testando da Silva',
        isDeleted: false,
      };

      jest.spyOn(service, 'update').mockResolvedValue(assignor);

      const response = await controller.updateAssignor(id, assignor);

      expect(response).toEqual(assignor);
    });

    it('Should remove an assignor', async () => {
      const id = '7c9a1eb0-20e0-4f4f-a62a-8c459b6385d2';
      const serviceResponse = { message: 'Cedente deletado com sucesso!' };

      jest.spyOn(service, 'remove').mockResolvedValue(serviceResponse);

      const response = await controller.deleteAssignor(id);

      expect(response).toEqual(serviceResponse);
    });
  });
});
