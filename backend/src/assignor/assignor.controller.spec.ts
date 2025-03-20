import { Test, TestingModule } from '@nestjs/testing';
import { AssignorController } from './assignor.controller';
import { AssignorService } from './assignor.service';
import { PrismaService } from 'src/prisma_service/prisma.service';

describe('AssignorController', () => {
  let controller: AssignorController;
  // let service: AssignorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssignorController],
      providers: [AssignorService, PrismaService],
    }).compile();

    controller = module.get<AssignorController>(AssignorController);
    // service = module.get<AssignorService>(AssignorService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
