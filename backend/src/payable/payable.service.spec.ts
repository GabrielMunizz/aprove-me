/* eslint-disable @typescript-eslint/unbound-method */
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

    it('Should return all payables', async () => {
      const payables = [payable, { ...payable, id: '2' }];

      jest.spyOn(prisma.accountPayable, 'findMany').mockResolvedValue(payables);

      const result = await service.findAll();

      expect(result).toEqual(payables);
      expect(result[0]).toEqual(payable);
      expect(result).toHaveLength(2);
    });

    it('Should return a payable by ID', async () => {
      const id = '1';

      jest
        .spyOn(prisma.accountPayable, 'findUnique')
        .mockResolvedValue(payable);

      const result = await service.findOne(id);

      expect(result).toEqual(payable);
    });

    it('Should update a payable', async () => {
      const id = '1';
      const updatedValue = { ...payable, value: 500.53 };

      jest.spyOn(service, 'findOne').mockResolvedValue(payable);

      jest
        .spyOn(prisma.accountPayable, 'update')
        .mockResolvedValue(updatedValue);

      const result = await service.update(id, updatedValue);

      expect(result).toEqual(updatedValue);

      expect(prisma.accountPayable.update).toHaveBeenCalledWith({
        where: { id },
        data: updatedValue,
      });
    });

    it('Should delete a payable', async () => {
      const id = '1';

      jest.spyOn(service, 'findOne').mockResolvedValue(payable);

      jest
        .spyOn(prisma.accountPayable, 'update')
        .mockResolvedValue({ ...payable, isDeleted: true });

      const result = await service.remove(id);

      expect(result).toEqual({ message: 'Recebível deletado com sucesso!' });
    });

    it('Should find a deleted payable by ID', async () => {
      const id = '1';
      const deletedPayable = { ...payable, isDeleted: true };

      jest
        .spyOn(service, 'findDeletedPayable')
        .mockResolvedValue(deletedPayable);

      const result = await service.findDeletedPayable(id);

      expect(result).toEqual(deletedPayable);
    });

    it('Should recover a deleted payable', async () => {
      const id = '1';
      const deletedPayable = { ...payable, isDeleted: true };

      jest
        .spyOn(service, 'findDeletedPayable')
        .mockResolvedValue(deletedPayable);

      jest.spyOn(prisma.accountPayable, 'update').mockResolvedValue(payable);

      const result = await service.recoverPayable(id);

      expect(result).toEqual({ message: 'Recebível recuperado com sucesso!' });
    });
  });
});
