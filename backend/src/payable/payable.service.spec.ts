import { Test, TestingModule } from '@nestjs/testing';
import { PayableService } from './payable.service';
import { PrismaService } from 'src/prisma_service/prisma.service';

describe('PayableService', () => {
  let service: PayableService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PayableService, PrismaService],
    }).compile();

    service = module.get<PayableService>(PayableService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('payable.service', () => {
    const payable = {
      id: '1',
      value: 150.9,
      emissionDate: new Date(),
      assignorId: '1',
      isDeleted: false,
    };

    const dto = {
      value: 150.9,
      emissionDate: new Date(),
      assignorId: '1',
    };

    it('Should create a payable', async () => {
      jest.spyOn(prisma.accountPayable, 'create').mockResolvedValue(payable);

      const result = await service.create(dto);

      expect(result).toEqual(payable);
    });
  });
});
