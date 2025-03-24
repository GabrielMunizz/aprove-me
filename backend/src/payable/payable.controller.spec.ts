import { Test, TestingModule } from '@nestjs/testing';
import { PayableController } from './payable.controller';
import { PayableService } from './payable.service';
import { PrismaService } from 'src/prisma_service/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CreatePayableDto } from './dto/create-payable.dto';

describe('PayableController', () => {
  let controller: PayableController;
  let service: PayableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayableController],
      providers: [
        PayableService,
        PrismaService,
        JwtService,
        {
          provide: 'PAYABLES_BATCH_SERVICE',
          useValue: {
            emit: jest.fn().mockResolvedValue('mocked result'),
          },
        },
      ],
    }).compile();

    controller = module.get<PayableController>(PayableController);
    service = module.get<PayableService>(PayableService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('payables controller', () => {
    it('Should create a payable', async () => {
      const createPayableDto: CreatePayableDto = {
        value: 100,
        emissionDate: new Date('2025-03-24'),
        assignorId: '7c9a1eb0-20e0-4f4f-a62a-8c459b6385d2',
      };

      const serviceMockReponse = {
        id: '1',
        ...createPayableDto,
        isDeleted: false,
      };

      const mockService = jest
        .spyOn(service, 'create')
        .mockResolvedValue(serviceMockReponse);

      const response = await controller.createPayable(createPayableDto);

      expect(response).toEqual(serviceMockReponse);
      expect(mockService).toHaveBeenCalledWith(createPayableDto);
    });

    it('Should find all payables', async () => {
      const mockPayables = [
        {
          id: '150cff95-21ab-441a-9c20-11d4bb2712d1',
          value: 8732.73,
          emissionDate: new Date('2025-03-26T03:00:00.000Z'),
          assignorId: '7c9a1eb0-20e0-4f4f-a62a-8c459b6385d2',
          isDeleted: false,
        },
        {
          id: '5da6e0e8-4fea-4447-bd4b-c82c5dd77fd0',
          value: 335,
          emissionDate: new Date('2025-03-26T03:00:00.000Z'),
          assignorId: '7c9a1eb0-20e0-4f4f-a62a-8c459b6385d2',
          isDeleted: false,
        },
      ];

      const mockService = jest
        .spyOn(service, 'findAll')
        .mockResolvedValue(mockPayables);

      const response = await controller.findAllPayables();

      expect(response).toEqual(mockPayables);
      expect(response).toHaveLength(2);
      expect(mockService).toHaveBeenCalledTimes(1);
    });

    it('Should find a payables by ID', async () => {
      const id = '150cff95-21ab-441a-9c20-11d4bb2712d1';
      const mockPayables = {
        id: '150cff95-21ab-441a-9c20-11d4bb2712d1',
        value: 8732.73,
        emissionDate: new Date('2025-03-26T03:00:00.000Z'),
        assignorId: '7c9a1eb0-20e0-4f4f-a62a-8c459b6385d2',
        isDeleted: false,
      };

      const mockService = jest
        .spyOn(service, 'findOne')
        .mockResolvedValue(mockPayables);

      const response = await controller.findOnePayable(id);

      expect(response).toEqual(mockPayables);
      expect(mockService).toHaveBeenCalledTimes(1);
      expect(mockService).toHaveBeenCalledWith(id);
    });

    it('Should update a payables by ID', async () => {
      const id = '150cff95-21ab-441a-9c20-11d4bb2712d1';

      const mockResponse = {
        id: '150cff95-21ab-441a-9c20-11d4bb2712d1',
        value: 150,
        emissionDate: new Date('2025-03-26T03:00:00.000Z'),
        assignorId: '7c9a1eb0-20e0-4f4f-a62a-8c459b6385d2',
        isDeleted: false,
      };

      const mockService = jest
        .spyOn(service, 'update')
        .mockResolvedValue(mockResponse);

      const response = await controller.updatePayable(id, mockResponse);

      expect(response).toEqual(mockResponse);
      expect(mockService).toHaveBeenCalledWith(id, mockResponse);
    });

    it('Should delete a payables by ID', async () => {
      const id = '150cff95-21ab-441a-9c20-11d4bb2712d1';

      const mockResponse = { message: 'Recebível deletado com sucesso!' };

      const mockService = jest
        .spyOn(service, 'remove')
        .mockResolvedValue(mockResponse);

      const response = await controller.deletePayable(id);

      expect(response).toEqual(mockResponse);
      expect(mockService).toHaveBeenCalledWith(id);
    });
  });
});
