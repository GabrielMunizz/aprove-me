/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { AssignorService } from './assignor.service';
import { PrismaService } from '../prisma_service/prisma.service';

describe('AssignorService', () => {
  let service: AssignorService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssignorService, PrismaService],
    }).compile();

    service = module.get<AssignorService>(AssignorService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('assignor.service', () => {
    const dto = {
      document: '12345678901',
      email: 'test@test.com',
      phone: '999999999',
      name: 'Testando da Silva',
    };

    const assignor = { ...dto, id: '1', isDeleted: false };

    it('Should create an assignor', async () => {
      jest.spyOn(prisma.assignor, 'create').mockResolvedValue(assignor);

      const result = await service.create(dto);

      expect(result).toHaveProperty('id');
      expect(result).toEqual(assignor);
    });

    it('Should return an list of assignors', async () => {
      const resolvedValue = [assignor, { ...assignor, id: '2' }];

      jest.spyOn(prisma.assignor, 'findMany').mockResolvedValue(resolvedValue);

      const result = await service.findAll();

      expect(result).toHaveLength(2);
      expect(result[1]).toEqual(resolvedValue[1]);
    });

    it('Should return an assignor by ID', async () => {
      jest.spyOn(prisma.assignor, 'findUnique').mockResolvedValue(assignor);

      const result = await service.findOne('1');

      expect(result).not.toBe(null);
      expect(result).toEqual(assignor);
    });

    it('Should update an assignor properly', async () => {
      const id = '1';

      jest.spyOn(service, 'findOne').mockResolvedValue(assignor);

      jest.spyOn(prisma.assignor, 'update').mockResolvedValue(assignor);

      const result = await service.update(id, assignor);

      expect(result).toEqual(assignor);

      expect(prisma.assignor.update).toHaveBeenCalledWith({
        where: { id },
        data: assignor,
      });
    });

    it('Shoud delete an assignor', async () => {
      const id = '1';

      jest.spyOn(service, 'findOne').mockResolvedValue(assignor);

      jest
        .spyOn(prisma.assignor, 'update')
        .mockResolvedValue({ ...assignor, isDeleted: true });

      const result = await service.remove(id);

      expect(result).toEqual({ message: 'Cedente deletado com sucesso!' });
    });

    it('Should list all deleted assignors', async () => {
      const deletedAssignors = [
        { ...assignor, isDeleted: true },
        { ...dto, id: '2', isDeleted: true },
      ];

      jest
        .spyOn(prisma.assignor, 'findMany')
        .mockResolvedValue(deletedAssignors);

      const result = await service.listDeletedAssignors();

      expect(result).toHaveLength(2);
      expect(result).toEqual(deletedAssignors);
    });

    it('Should find a deleted assignor by ID', async () => {
      const id = '1';

      const deletedAssignor = {
        ...assignor,
        isDeleted: true,
      };

      jest
        .spyOn(prisma.assignor, 'findUnique')
        .mockResolvedValue(deletedAssignor);

      const result = await service.findDeletedAssignor(id);

      expect(result).toEqual(deletedAssignor);
    });

    it('Should recover a deleted assignor', async () => {
      const id = '1';
      const recoveryMessage = { message: 'Usuário recuperado com sucesso!' };

      jest
        .spyOn(service, 'findDeletedAssignor')
        .mockResolvedValue({ ...assignor, isDeleted: true });

      jest.spyOn(prisma.assignor, 'update').mockResolvedValue(assignor);

      const result = await service.recoverAssignor(id);

      expect(result).toEqual(recoveryMessage);
    });
  });
});
