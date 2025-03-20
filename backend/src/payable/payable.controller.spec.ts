import { Test, TestingModule } from '@nestjs/testing';
import { PayableController } from './payable.controller';
import { PayableService } from './payable.service';
import { PrismaService } from 'src/prisma_service/prisma.service';

describe('PayableController', () => {
  let controller: PayableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayableController],
      providers: [PayableService, PrismaService],
    }).compile();

    controller = module.get<PayableController>(PayableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
